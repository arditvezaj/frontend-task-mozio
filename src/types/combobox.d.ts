import { Destination } from "./destination";

export interface ComboboxProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  destination: Destination;
  setDestination: (value: Destination) => void;
  destinations: Destination[];
  setDestinations: (value: Destination[]) => void;
  setIsLoading: (value: boolean) => void;
  setError: (value: string) => void;
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
}
