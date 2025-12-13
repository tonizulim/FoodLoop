import { Listing } from "./Listing";
import { LocationPoint } from "./Location";

export interface MapProps {
  listings: Listing[];
  selectedLocation: LocationPoint | null;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<LocationPoint | null>
  >;
}
