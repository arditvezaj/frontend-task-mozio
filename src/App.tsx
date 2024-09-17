import { useState } from "react";
import { Destination } from "./types/destination";
import Combobox from "./components/Combobox";
import DestinationDetails from "./components/DestinationDetails";
import Spinner from "./components/ui/Spinner";

const App = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [destination, setDestination] = useState<Destination>({
    id: 0,
    name: "",
    description: "",
    country: "",
    climate: "",
    currency: "",
    latitude: 0,
    longitude: 0,
  });
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col justify-center items-center mt-[10rem]">
      <Combobox
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        destination={destination}
        setDestination={setDestination}
        destinations={destinations}
        setDestinations={setDestinations}
        setIsLoading={setIsLoading}
        setError={setError}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />

      {isLoading || !destination ? (
        <Spinner />
      ) : (
        <DestinationDetails
          destination={destination}
          destinations={destinations}
          setDestination={setDestination}
          error={error}
          searchInput={searchInput}
          isChecked={isChecked}
        />
      )}
    </div>
  );
};

export default App;
