import { memo, useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { InteractiveMapContainerStyle } from "../styles/styles";
import { INITIAL_CENTERED_COORDINATES } from "../shared/constants";
import { addPoints, extractMapData } from "../helpers/helpers";

const pointsData: GeoJSON.FeatureCollection = require("../data/points.json");

let pointsFilterWorker: Worker;

interface InteractiveMapProps {
  mapContainerRef: React.RefObject<HTMLDivElement>;
  mapRef: React.MutableRefObject<Map | undefined>;
}

export const InteractiveMap = memo(
  ({ mapContainerRef, mapRef }: InteractiveMapProps) => {
    useEffect(() => {
      const accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

      if (!accessToken) {
        return;
      }

      mapboxgl.accessToken = accessToken;

      if (window.Worker)
        pointsFilterWorker = new Worker(
          new URL("../workers/pointsFilterWorker.ts", import.meta.url)
        );

      if (mapContainerRef.current) {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          center: INITIAL_CENTERED_COORDINATES,
          zoom: 8,
          maxZoom: 15,
        });

        mapRef.current.on("load", () => {
          pointsFilterWorker.postMessage(pointsData);
          pointsFilterWorker.onmessage = ({
            data,
          }: {
            data: GeoJSON.FeatureCollection;
          }) => {
            const { source, layer } = extractMapData(data);

            addPoints(mapRef, source, layer);
          };
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
