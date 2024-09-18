import React, { memo } from "react";
import { Destination } from "../../types/destination";
import Spinner from "../ui/Spinner";

interface DestinationListProps {
  isLoading: boolean;
  destinations: Destination[];
  selectDestinationHandler: (destination: Destination) => void;
  listRef: React.RefObject<HTMLUListElement>;
  focusedIndex: number;
  error: string;
}

const DestinationList: React.FC<DestinationListProps> = ({
  isLoading,
  destinations,
  selectDestinationHandler,
  listRef,
  focusedIndex,
  error,
}) => {
  if (error.length > 0) return <p className="pt-2 text-red-500">{error}</p>;

  return (
    <ul
      id="destination-list"
      className="absolute z-10 w-full mt-1 bg-white border p-2 border-gray-300 rounded-xl shadow-lg"
      ref={listRef}
      role="listbox"
    >
      {isLoading || !destinations.length ? (
        <li className="flex justify-center items-center p-2 cursor-pointer hover:bg-gray-100">
          <Spinner />
        </li>
      ) : (
        destinations.map((destination, index) => (
          <li
            key={destination.id}
            onClick={() => selectDestinationHandler(destination)}
            className={`p-2 cursor-pointer hover:bg-gray-100 ${
              index === focusedIndex ? "bg-gray-200" : ""
            }`}
            role="option"
            aria-selected={index === focusedIndex}
          >
            {destination.name}
          </li>
        ))
      )}
    </ul>
  );
};

export default memo(DestinationList);
