// "use client";

// import { useEffect, useRef } from "react";
// import maplibregl, { Map as MaplibreMap } from "maplibre-gl";
// import "maplibre-gl/dist/maplibre-gl.css";
// import { MapProps } from "@/types/MapProps";

// export default function Map({
//   listings,
//   setSelectedLocation,
//   selectedLocation,
// }: MapProps) {
//   const mapContainer = useRef<HTMLDivElement | null>(null);
//   const map = useRef<MaplibreMap | null>(null);

//   useEffect(() => {
//     if (!mapContainer.current || map.current) return;

//     map.current = new maplibregl.Map({
//       container: mapContainer.current,
//       style: process.env.NEXT_PUBLIC_MAP_URL,
//       //style: "https://tiles.stadiamaps.com/styles/osm_bright.json",
//       center: [16.4402, 43.5081], // Split, Croatia
//       zoom: 12,
//     });

//     map.current.addControl(new maplibregl.NavigationControl());
//   }, []);

//   useEffect(() => {
//     if (!map.current) return;

//     const markers: maplibregl.Marker[] = [];

//     listings.forEach((item) => {
//       const isSelected =
//         selectedLocation?.lng === item.location.lng &&
//         selectedLocation?.lat === item.location.lat;

//       const marker = new maplibregl.Marker({
//         color: isSelected ? "#f97316" : "#22c55e",
//       })
//         .setLngLat([item.location.lng, item.location.lat])
//         .addTo(map.current!);

//       marker.getElement().addEventListener("click", () => {
//         setSelectedLocation((prev) => {
//           if (
//             prev?.lng === item.location.lng &&
//             prev?.lat === item.location.lat
//           ) {
//             return null;
//           }
//           return item.location;
//         });
//       });

//       markers.push(marker);
//     });

//     return () => {
//       markers.forEach((marker) => marker.remove());
//     };
//   }, [listings, selectedLocation, setSelectedLocation]);

//   useEffect(() => {
//     if (!map.current || !selectedLocation) return;

//     map.current.flyTo({
//       center: [selectedLocation.lng, selectedLocation.lat],
//       zoom: 14,
//     });
//   }, [selectedLocation]);

//   return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
// }


"use client";

import { useEffect, useRef } from "react";
import maplibregl, { Map as MaplibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type Location = {
  lng: number;
  lat: number;
};

type Listing = {
  location: Location;
};

type MapProps = {
  listings?: Listing[]; // optional
  selectedLocation?: Location | null;
  setSelectedLocation?: React.Dispatch<
    React.SetStateAction<Location | null>
  >;
  onLocationSelect?: (lng: number, lat: number) => void; // for picker mode
};

export default function Map({
  listings = [],
  selectedLocation = null,
  setSelectedLocation,
  onLocationSelect,
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MaplibreMap | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const selectedMarkerRef = useRef<maplibregl.Marker | null>(null);

  // INIT MAP
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: process.env.NEXT_PUBLIC_MAP_URL,
      center: [16.4402, 43.5081],
      zoom: 12,
    });

    map.current.addControl(new maplibregl.NavigationControl());
  }, []);

  // LISTING MARKERS MODE
  useEffect(() => {
    if (!map.current || !listings.length) return;

    // remove old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    listings.forEach((item) => {
      const isSelected =
        selectedLocation?.lng === item.location.lng &&
        selectedLocation?.lat === item.location.lat;

      const marker = new maplibregl.Marker({
        color: isSelected ? "#f97316" : "#22c55e",
      })
        .setLngLat([item.location.lng, item.location.lat])
        .addTo(map.current!);

      if (setSelectedLocation) {
        marker.getElement().addEventListener("click", () => {
          setSelectedLocation((prev) => {
            if (
              prev?.lng === item.location.lng &&
              prev?.lat === item.location.lat
            ) {
              return null;
            }
            return item.location;
          });
        });
      }

      markersRef.current.push(marker);
    });
  }, [listings, selectedLocation, setSelectedLocation]);

  // PICKER MODE (click on map)
  useEffect(() => {
    if (!map.current || !onLocationSelect) return;

    const handleClick = (e: maplibregl.MapMouseEvent) => {
      const { lng, lat } = e.lngLat;

      // remove previous selected marker
      if (selectedMarkerRef.current) {
        selectedMarkerRef.current.remove();
      }

      // add new marker
      const marker = new maplibregl.Marker({ color: "#f97316" })
        .setLngLat([lng, lat])
        .addTo(map.current!);

      selectedMarkerRef.current = marker;

      onLocationSelect(lng, lat);

      map.current?.flyTo({
        center: [lng, lat],
        zoom: 15,
      });
    };

    map.current.on("click", handleClick);

    return () => {
      map.current?.off("click", handleClick);
    };
  }, [onLocationSelect]);

  // FLY TO SELECTED LOCATION
  useEffect(() => {
    if (!map.current || !selectedLocation) return;

    map.current.flyTo({
      center: [selectedLocation.lng, selectedLocation.lat],
      zoom: 14,
    });
  }, [selectedLocation]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
}