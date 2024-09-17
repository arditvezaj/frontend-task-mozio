import { Destination } from "../types/destination";

export const getAllDestinations = async () => {
  const response = await fetch("/Data.json");
  return await response.json();
};

export const getDestinationsByName = async (searchInput: string) => {
  if (searchInput === "fail") throw new Error("Something went wrong");

  console.log(`getDestinationsByName called with argument: ${searchInput}`);

  const response = await fetch("/Data.json");
  const destinations = await response.json();

  const filteredDestinations = destinations.filter((destination: Destination) =>
    destination.name.toLowerCase().match(searchInput.toLowerCase())
  );

  if (filteredDestinations.length) {
    return filteredDestinations;
  } else {
    throw new Error("Destination not found");
  }
};

export const getDestinationByName = async (searchInput: string) => {
  if (searchInput === "fail") throw new Error("Something went wrong");

  console.log(`getDestinationByName called with argument: ${searchInput}`);

  const response = await fetch("/Data.json");
  const destinations = await response.json();

  const filteredDestination = destinations.find((destination: Destination) =>
    destination.name.toLowerCase().match(searchInput.toLowerCase())
  );

  if (filteredDestination) {
    return { data: filteredDestination };
  } else {
    throw new Error("Destination not found");
  }
};
