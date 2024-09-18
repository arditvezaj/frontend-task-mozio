import { Destination } from "./destination";

export interface ComboboxProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  destination: Destination;
  setDestination: (value: Destination) => void;
  destinations: Destination[];
  setDestinations: (value: Destination[]) => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  error: string;
  setError: (value: string) => void;
  setSelectedDestination: (value: boolean) => void;
}
