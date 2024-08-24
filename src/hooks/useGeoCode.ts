import { useState, useEffect } from "react";
import Geocode from "react-geocode";

interface AddressComponent {
  long_name: string;
  types: string[];
}

interface Result {
  formatted_address: string;
  address_components: AddressComponent[];
}

interface Response {
  results: Result[];
}

export const useGeoCode = (apiKey: string) => {
  Geocode.setApiKey(apiKey);

  const [address, setAddress] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [isoCode, setIsoCode] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: -32.8895,
    lng: -68.8458,
  });
  const [geoAvailable, setGeoAvailable] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoAvailable(false);
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setLocation({ lat, lng });
    });
  }, [apiKey]);

  useEffect(() => {
    if (!location) {
      return;
    }

    Geocode.fromLatLng(location?.lat.toString(), location?.lng.toString()).then(
      (response: Response) => {
        const addr = response.results[0].formatted_address;
        setAddress(addr);

        const localityComponent = response.results[0].address_components.find(
          (component) => component.types.includes("locality")
        );
        if (localityComponent) {
          setCity(localityComponent.long_name);
        }

        const stateComponent = response.results[0].address_components.find(
          (component) => component.types.includes("administrative_area_level_1")
        );
        if (stateComponent) {
          setState(stateComponent.long_name);
        }
        const countryComponent = response.results[0].address_components.find(
          (component) => component.types.includes("country")
        );
        if (countryComponent) {
          setCountry(countryComponent.long_name);
          // @ts-ignore
          const isoCode = countryComponent.short_name;
          setIsoCode(isoCode);
        }

        const zipCodeComponent = response.results[0].address_components.find(
          (component) => component.types.includes("postal_code")
        );
        if (zipCodeComponent) {
          setZipCode(zipCodeComponent.long_name);
        }
      },
      (error: Error) => {
        console.error(error);
        setError(error);
      }
    );
  }, [location]);

  return {
    address,
    city,
    state,
    country,
    isoCode,
    location,
    zipCode,
    geoAvailable,
    error,
  };
};
