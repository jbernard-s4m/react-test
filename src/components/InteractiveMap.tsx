import { memo, useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { InteractiveMapContainerStyle } from "../styles/styles";
import { INITIAL_CENTERED_COORDINATES } from "../shared/constants";
import { addPoints, extractMapData } from "../helpers/helpers";
import { MapData } from "../shared/types";

const pointsData: GeoJSON.FeatureCollection = require("../data/points.json");

let pointsFilterWorker: Worker;

interface InteractiveMapProps {
  mapContainerRef: React.RefObject<HTMLDivElement>;
  mapRef: React.MutableRefObject<Map | undefined>;
}

export const InteractiveMap = memo(
  ({ mapContainerRef, mapRef }: InteractiveMapProps) => {
    useEffect(() => {
      let mapData: MapData;
      const accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

      if (!accessToken) {
        return;
      }

      if (window.Worker)
        pointsFilterWorker = new Worker(
          new URL("../workers/pointsFilterWorker.ts", import.meta.url)
        );

      mapboxgl.accessToken = accessToken;

      if (mapContainerRef.current) {
        // Start worker as soon as map container is available
        pointsFilterWorker.postMessage(pointsData);

        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          center: INITIAL_CENTERED_COORDINATES,
          zoom: 8,
          maxZoom: 15,
        });

        pointsFilterWorker.onmessage = ({
          data,
        }: {
          data: GeoJSON.FeatureCollection;
        }) => {
          // If map finished loading first
          if (mapRef.current?.loaded()) {
            const { source, layer } = extractMapData(data);
            addPoints(mapRef, source, layer);
          } else {
            mapData = extractMapData(data);
          }
        };

        mapRef.current.on("load", () => {
          // If worker finished first
          if (mapData) {
            addPoints(mapRef, mapData.source, mapData.layer);
          }
        });

        return () => {
          pointsFilterWorker.terminate();
          mapRef.current?.remove();
        };
      }
    }, []);

    return <div style={InteractiveMapContainerStyle} ref={mapContainerRef} />;
  }
);
