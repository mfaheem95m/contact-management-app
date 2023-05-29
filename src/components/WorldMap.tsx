import { Marker, Popup } from "react-leaflet";
import L, { IconOptions, LeafletEvent } from "leaflet";
import markerIcon from "../images/icon/marker_icon.png";

interface CountryInfo {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    _id: string;
    lat: number;
    long: number;
  };
}

interface WorldMapProps {
  countriesData: CountryInfo[];
}

const customMarkerIcon: IconOptions = {
  iconUrl: markerIcon,
  iconSize: [20, 25],
  iconAnchor: [15, 30],
};

const WorldMap: React.FC<WorldMapProps> = ({ countriesData }) => {
  console.log("dash", countriesData);
  return (
    <div className="h-100 pt-20 px-4 pb-8">
      {countriesData?.map((country) => (
        <Marker
          icon={L.icon(customMarkerIcon)}
          key={country.country}
          position={[country.countryInfo.lat, country.countryInfo.long]}
        >
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <p>
                Active Cases: {country.active} <br />
                Recovered Cases: {country.recovered} <br />
                Deaths: {country.deaths}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </div>
  );
};

export default WorldMap;
