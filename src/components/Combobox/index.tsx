import { memo, useState, useEffect, ChangeEvent } from "react";
import { ComboboxProps } from "../../types/combobox";
import {
  getDestinationByName,
  getDestinationsByName,
} from "../../api/fake-api";
import { Checkbox } from "../ui/Checkbox";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

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
    setDestination,
    setDestinations,
    setIsLoading,
    setError,
    isChecked,
    setIsChecked,
  } = props;

  const debouncedQuery = useDebounce({ value: searchInput, delay: 300 });

  useEffect(() => {
    const fetchDestinations = async () => {
      setIsLoading(true);
      setError("");

      try {
        if (isChecked) {
          const response = await getDestinationsByName(debouncedQuery);
          setDestinations(response);
        } else {
          const response = await getDestinationByName(debouncedQuery);
          setDestination(response.data);
        }
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

    if (debouncedQuery) {
      fetchDestinations();
    } else {
      setDestinations([]);
      setDestination({
        id: 0,
        name: "",
        description: "",
        country: "",
        climate: "",
        currency: "",
        latitude: 0,
        longitude: 0,
      });
    }
  }, [
    debouncedQuery,
    isChecked,
    setDestination,
    setDestinations,
    setError,
    setIsLoading,
  ]);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchInput(searchValue);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-[500px] flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Label className="font-semibold">Search travel destination</Label>
        <div className="flex items-center gap-2">
          <Checkbox
            id="terms"
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor="terms">Fetch all destinations</Label>
        </div>
      </div>
      <Input
        type="text"
        value={searchInput}
        onChange={handleSearchInput}
        placeholder="Search travel destination"
        className="border-2 border-gray-300 rounded-md py-3 px-4"
      />
    </div>
  );
};

export default memo(Combobox);
