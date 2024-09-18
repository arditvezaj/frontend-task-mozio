import React, { memo } from "react";
import { Destination } from "../../types/destination";
import { DestinationDetailsProps } from "../../types/destination-details";
import DestinationInfo from "../DestinationInfo";

const DestinationDetails: React.FC<DestinationDetailsProps> = (props) => {
  const {
    destination,
    setDestination,
    setSearchInput,
    error,
    selectedDestination,
    setSelectedDestination,
  } = props;

  const selectDestinationHandler = (selected: Destination) => {
    setSelectedDestination(true);
    setDestination(selected);
    setSearchInput(selected.name);
  };

  if (!selectedDestination) return null;
  if (error) return <p className="pt-6 text-red-500">{error}</p>;

  return (
    <DestinationInfo
      destination={destination}
      selectDestinationHandler={selectDestinationHandler}
    />
  );
};

export default memo(DestinationDetails);
