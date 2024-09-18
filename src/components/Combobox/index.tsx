import {
  memo,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useRef,
} from "react";
import { ComboboxProps } from "../../types/combobox";
import { getDestinationsByName } from "../../api/fake-api";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Destination } from "../../types/destination";
import DestinationList from "../DestinationList";
const useDebounce = ({ value, delay }: { value: string; delay: number }) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Combobox: React.FC<ComboboxProps> = (props) => {
  const {
    searchInput,
    setSearchInput,
    setDestinations,
    setDestination,
    isLoading,
    setIsLoading,
    destination,
    destinations,
    error,
    setError,
    setSelectedDestination,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const debouncedQuery = useDebounce({ value: searchInput, delay: 300 });
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let loadingTimeout: ReturnType<typeof setTimeout>;
    setIsOpen(true);

    const fetchDestinations = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getDestinationsByName(debouncedQuery);
        setDestinations(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedQuery !== destination.name) {
      loadingTimeout = setTimeout(() => {
        fetchDestinations();
      }, 2000);

      if (isTyping) {
        setSelectedDestination(false);
      }

      if (debouncedQuery.length === 0) setIsOpen(false);
    } else {
      setDestinations([]);
      setIsLoading(false);
      setIsOpen(false);
    }

    return () => {
      clearTimeout(loadingTimeout);
      setIsLoading(false);
    };
  }, [
    debouncedQuery,
    setDestinations,
    setError,
    setIsLoading,
    setSelectedDestination,
    isTyping,
  ]);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    setIsTyping(true);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex < destinations.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (event.key === "Enter" && focusedIndex !== -1) {
      event.preventDefault();
      selectDestinationHandler(destinations[focusedIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const selectDestinationHandler = (selected: Destination) => {
    setSelectedDestination(true);
    setDestination(selected);
    setSearchInput(selected.name);
    setIsOpen(false);
  };

  useEffect(() => {
    if (focusedIndex !== -1 && listRef.current) {
      const focusedElement = listRef.current.children[
        focusedIndex
      ] as HTMLElement;
      focusedElement.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  return (
    <div className="flex flex-col gap-3 w-[500px] bg-gray-300 rounded-xl pt-14 p-10">
      <Label className="font-semibold">Location</Label>
      <div className="relative">
        <Input
          type="text"
          value={searchInput}
          onChange={handleSearchInput}
          onKeyDown={handleKeyDown}
          placeholder="Search a location..."
          className="border-2 border-gray-300 rounded-xl py-3 px-4"
          ref={inputRef}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="destination-list"
        />
        {isOpen && (
          <DestinationList
            isLoading={isLoading}
            listRef={listRef}
            destinations={destinations}
            focusedIndex={focusedIndex}
            selectDestinationHandler={selectDestinationHandler}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default memo(Combobox);
