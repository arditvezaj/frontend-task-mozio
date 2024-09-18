import { Destination } from "../types/destination";

export const getAllDestinations = async (): Promise<Destination[]> => {
  const response = await fetch("/Data.json");
  return response.json();
};

export const getDestinationsByName = async (
  searchInput: string
): Promise<Destination[]> => {
  if (searchInput === "fail") throw new Error("Something went wrong");

  const destinations = await getAllDestinations();

  const filteredDestinations = destinations.filter((destination: Destination) =>
    destination.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (filteredDestinations.length) {
    return filteredDestinations;
  } else {
    throw new Error("Destination not found");
  }
};
