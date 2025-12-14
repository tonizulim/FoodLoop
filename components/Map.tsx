"use client";

import { useEffect, useRef } from "react";
import maplibregl, { Map as MaplibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapProps } from "@/types/MapProps";

export default function Map({
  listings,
  setSelectedLocation,
  selectedLocation,
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MaplibreMap | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: process.env.NEXT_PUBLIC_MAP_URL,
      //style: "https://tiles.stadiamaps.com/styles/osm_bright.json",
      center: [16.4402, 43.5081], // Split, Croatia
      zoom: 12,
    });

    map.current.addControl(new maplibregl.NavigationControl());
  }, []);

  useEffect(() => {
    if (!map.current) return;

    const markers: maplibregl.Marker[] = [];

    listings.forEach((item) => {
      const isSelected =
        selectedLocation?.lng === item.location.lng &&
        selectedLocation?.lat === item.location.lat;

      const marker = new maplibregl.Marker({
        color: isSelected ? "#f97316" : "#22c55e",
      })
        .setLngLat([item.location.lng, item.location.lat])
        .addTo(map.current!);

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

      markers.push(marker);
    });

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [listings, selectedLocation, setSelectedLocation]);

  useEffect(() => {
    if (!map.current || !selectedLocation) return;

    map.current.flyTo({
      center: [selectedLocation.lng, selectedLocation.lat],
      zoom: 14,
    });
  }, [selectedLocation]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
}
