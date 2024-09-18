import { useState } from "react";
import { Destination } from "./types/destination";
import Combobox from "./components/Combobox";
import DestinationDetails from "./components/DestinationDetails";

const initialDestination: Destination = {
  id: 0,
  name: "",
  description: "",
  country: "",
  climate: "",
  currency: "",
  latitude: 0,
  longitude: 0,
};

const App: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [destination, setDestination] =
    useState<Destination>(initialDestination);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedDestination, setSelectedDestination] =
    useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center mt-[10rem]">
      <Combobox
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        destination={destination}
        setDestination={setDestination}
        destinations={destinations}
        setDestinations={setDestinations}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
        setError={setError}
        setSelectedDestination={setSelectedDestination}
      />
      <DestinationDetails
        destination={destination}
        setDestination={setDestination}
        setSearchInput={setSearchInput}
        error={error}
        selectedDestination={selectedDestination}
        setSelectedDestination={setSelectedDestination}
      />
    </div>
  );
};

export default App;
