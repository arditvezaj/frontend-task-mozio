import { Destination } from "./destination";

export interface DestinationDetailsProps {
  destination: Destination;
  setDestination: (value: Destination) => void;
  setSearchInput: (value: string) => void;
  error: string;
  selectedDestination: boolean;
  setSelectedDestination: (value: boolean) => void;
}
