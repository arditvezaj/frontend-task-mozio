import React, { memo, useState, useEffect } from "react";
import { Destination } from "../../types/destination";
import { getAllDestinations } from "../../api/fake-api";
import findTop5NearestDestinations from "../../utils/findNearestDestinations";
import { Button } from "../ui/Button";
import Spinner from "../ui/Spinner";

interface DestinationInfoProps {
  destination: Destination;
  selectDestinationHandler: (destination: Destination) => void;
}

const DestinationInfo: React.FC<DestinationInfoProps> = ({
  destination,
  selectDestinationHandler,
}) => {
  const [nearbyDestinations, setNearbyDestinations] = useState<Destination[]>(
    []
  );
  const [nearbyDestinationsLoading, setNearbyDestinationsLoading] =
    useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    setNearbyDestinationsLoading(true);

    const getTop5NearestDestinations = async () => {
      const allDestinations = await getAllDestinations();
      const filteredDestinations = findTop5NearestDestinations(
        [destination.latitude, destination.longitude],
        allDestinations
      );

      timeout = setTimeout(() => {
        setNearbyDestinations(filteredDestinations);
        setNearbyDestinationsLoading(false);
      }, 2000);
    };

    getTop5NearestDestinations();

    return () => {
      clearTimeout(timeout);
    };
  }, [destination]);

  const fields = [
    { label: "Country:", value: destination.country },
    { label: "Climate:", value: destination.climate },
    { label: "Currency:", value: destination.currency },
  ];

  return (
    <div className="flex flex-col gap-10 pt-10 w-[500px]">
      <div className="flex flex-col gap-3">
        <h1 className="text-[26px] font-semibold">{destination.name}</h1>
        <p>{destination.description}</p>
        {fields.map((field) => (
          <div key={field.label} className="flex gap-2">
            <p className="font-bold">{field.label}</p>
            <p>{field.value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl">Nearby Locations:</h1>
        <div className="flex flex-wrap justify-start gap-2.5">
          {nearbyDestinationsLoading ? (
            <Spinner />
          ) : (
            nearbyDestinations.map((destination) => (
              <Button
                key={destination.id}
                onClick={() => selectDestinationHandler(destination)}
              >
                {destination.name.toUpperCase()}
              </Button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(DestinationInfo);
