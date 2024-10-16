import { useState, useEffect, useRef } from "react";
import maplibregl, {
  Map as MapLibreMap,
  NavigationControl,
  Marker,
  Popup,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";

const Tiles = ({
  start,
  end,
  setTravelDist,
  setTravelTime,
  setTravelTimeSeconds,
  setPath,
}) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    if (map) {
      // Cleanup function to remove layers and sources when map changes
      return () => {
        map.getStyle().layers.forEach((layer) => {
          if (layer.id.startsWith("marker-") || layer.id.startsWith("path-")) {
            map.removeLayer(layer.id);
            if (map.getSource(layer.id)) {
              map.removeSource(layer.id);
            }
          }
        });
      };
    }
  }, [map]);

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new MapLibreMap({
        container: mapContainer.current,
        center: [0, 0],
        zoom: 2,
        style:
          "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        transformRequest: (url, resourceType) => {
          const apiKey = "p8lsgxOcPze4k9SEKo3JlwYeYmxa6WNnfVLGP7pI";
          return {
            url: `${
              url.includes("?")
                ? `${url}&api_key=${apiKey}`
                : `${url}?api_key=${apiKey}`
            }`,
            resourceType,
          };
        },
      });

      mapInstance.on("load", () => {
        setMap(mapInstance);
      });

      const nav = new NavigationControl({ visualizePitch: true });
      mapInstance.addControl(nav, "top-left");
    };

    initializeMap();
  }, []);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers and paths
    map.getStyle().layers.forEach((layer) => {
      if (layer.id.startsWith("marker-") || layer.id.startsWith("path-")) {
        map.removeLayer(layer.id);
        if (map.getSource(layer.id)) {
          map.removeSource(layer.id);
        }
      }
    });

    // Add Start marker
    if (start) {
      new Marker({ color: "blue" })
        .setLngLat(start)
        .setPopup(new Popup().setText("Start Location"))
        .addTo(map);
    }

    // Add End marker
    if (end) {
      new Marker({ color: "yellow" })
        .setLngLat(end)
        .setPopup(new Popup().setText("End Location"))
        .addTo(map);
    }

    // Fit map bounds to include both start and end points
    if (start || end) {
      const bounds = new maplibregl.LngLatBounds();
      if (start) bounds.extend(start);
      if (end) bounds.extend(end);
      map.fitBounds(bounds, { padding: 20,
        maxZoom: 14, });
    }

    // API call for path if both start and end are defined
    if (start && end) {
      axios
        .post(
          `https://api.olamaps.io/routing/v1/directions?origin=${start[1]}%2C${start[0]}&destination=${end[1]}%2C${end[0]}&alternatives=false&steps=true&overview=simplified&language=en&traffic_metadata=false&api_key=p8lsgxOcPze4k9SEKo3JlwYeYmxa6WNnfVLGP7pI`
        )
        .then((res) => {
          const route = res.data.routes[0];
          console.log(route)
          // Extract coordinates from the route
          const coordinates = [];
          route.legs[0].steps.forEach((step) => {
            const { start_location, end_location } = step;
            coordinates.push([start_location.lng, start_location.lat]);
            coordinates.push([end_location.lng, end_location.lat]);
          });
          setPath(coordinates);

          // Create GeoJSON for the path
          const routeGeoJSON = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
          };

          // Set travel details
          // setTravelDist(route.legs[0].readable_distance);
          // setTravelTime(route.legs[0].readable_duration);
          // setTravelTimeSeconds(route.legs[0].duration);
          // setPath(coordinates);

          // Add path to the map
          map.addSource("path", {
            type: "geojson",
            data: routeGeoJSON,
          });

          // Add path layer
          map.addLayer({
            id: "path",
            type: "line",
            source: "path",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#007cbf",
              "line-width": 4,
            },
          });

          // Adjust map to fit the entire path
          const pathBounds = new maplibregl.LngLatBounds();
          coordinates.forEach((coord) => {
            pathBounds.extend(coord);
          });

          map.fitBounds(pathBounds, { padding: 20 });
        })
        .catch((error) => console.error("Error fetching paths:", error));
    }
  }, [map, start, end]);

  return (
    <div
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
      ref={mapContainer}
      id="central-map"
    />
  );
};

export default Tiles;
