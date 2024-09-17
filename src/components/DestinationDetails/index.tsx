import React, { useState, memo, useEffect } from "react";
import { Destination } from "../../types/destination";
import { DestinationDetailsProps } from "../../types/destination-details";
import { getAllDestinations } from "../../api/fake-api";
import findTop5NearestDestinations from "../../utils/findNearestDestinations";
import { Button } from "../ui/Button";

const DestinationDetails: React.FC<DestinationDetailsProps> = ({
  destination,
  destinations,
  setDestination,
  error,
  searchInput,
  isChecked,
}) => {
  const [selectedDestination, setSelectedDestination] = useState(false);
  const [nearbyDestinations, setNearbyDestinations] = useState<Destination[]>(
    []
  );

  useEffect(() => {
    const getTop5NearestDestinations = async () => {
      const destinations = await getAllDestinations();
      const filteredDestinations = findTop5NearestDestinations(
        [destination.latitude, destination.longitude],
        destinations
      );
      setNearbyDestinations(filteredDestinations);
    };

    getTop5NearestDestinations();
  }, [destination]);

  if (!searchInput.length)
    return (
      <div className="h-[22rem] pt-6">
        <p>Please enter a search term.</p>
      </div>
    );
  if (error)
    return (
      <div className="h-[22rem] pt-6">
        <p className="text-red-500">{error}</p>
      </div>
    );

  const fields = [
    { label: "Name:", value: destination.name },
    { label: "Country:", value: destination.country },
    { label: "Description:", value: destination.description },
    { label: "Climate:", value: destination.climate },
    { label: "Currency:", value: destination.currency },
    { label: "Latitude:", value: destination.latitude },
    { label: "Longitude:", value: destination.longitude },
  ];

  const selectDestinationHandler = (destination: Destination) => {
    setSelectedDestination(true);
    setDestination(destination);
  };

  return !selectedDestination ? (
    <div className="h-[22rem] w-[500px] pt-3">
      {isChecked ? (
        <div className="flex flex-col gap-3 pb-20">
          {destinations.map((destination) => (
            <Button
              key={destination.id}
              onClick={() => selectDestinationHandler(destination)}
            >
              {destination.name}
            </Button>
          ))}
        </div>
      ) : (
        destination.name && (
          <Button onClick={() => selectDestinationHandler(destination)}>
            {destination.name}
          </Button>
        )
      )}
    </div>
  ) : (
    <div className="pt-6 w-[500px] h-[22rem] grid grid-cols-2 gap-4">
      {fields.map((field) => (
        <div key={field.label}>
          <div className="font-semibold">{field.label}</div>
          <div>{field.value}</div>
        </div>
      ))}
      <p className="pt-3 col-span-2 text-center font-semibold">
        Nearby Destinations:
      </p>
      {nearbyDestinations.map((destination) => (
        <Button
          key={destination.id}
          onClick={() => setDestination(destination)}
        >
          {destination.name}
        </Button>
      ))}
    </div>
  );
};

export default memo(DestinationDetails);
