import { Destination } from "./destination";

export interface DestinationDetailsProps {
  destination: Destination;
  destinations: Destination[];
  setDestination: (value: Destination) => void;
  error: string;
  searchInput: string;
  isChecked: boolean;
}
