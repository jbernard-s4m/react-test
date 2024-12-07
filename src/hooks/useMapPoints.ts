import { useRef, useState } from "react";
import { GeoJSONFeature, Map } from "mapbox-gl";
import { MAP_HIGHLIGHTED_POINT_LAYER_ID, MAP_HIGHLIGHTED_POINT_SOURCE_ID } from "../shared/constants";
import { addPoints, extractMapData } from "../helpers/helpers";

const pointsData: GeoJSON.FeatureCollection = require("../data/points.json");

export const useMapPoints = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>();
  const [renderedPoints, setRenderedPoints] = useState<GeoJSONFeature[]>([]);
  const [highlightedPointId, setHighlightedPointId] = useState<number | null>(null);

  const handleShowPoints = () => {
    if (!mapRef.current) {
      return;
    }

    const mapPoints: GeoJSONFeature[] = mapRef.current.queryRenderedFeatures();

    if (mapPoints.length === 0) {
      return;
    }

    // When point is highlited, be sure to remove highlited duplicate
    setRenderedPoints(
      highlightedPointId ? mapPoints.filter((point) => point.layer?.id !== MAP_HIGHLIGHTED_POINT_LAYER_ID) : mapPoints
    );
  };

  const handleHightlightPoint = (id: number) => { 
    if (!mapRef.current) {
      return;
    }

    // When clicking on an already highlited point
    // Remove highlight and highlight layer
    if (highlightedPointId === id) {
      mapRef.current.removeLayer(MAP_HIGHLIGHTED_POINT_LAYER_ID);
      mapRef.current.removeSource(MAP_HIGHLIGHTED_POINT_SOURCE_ID);
      setHighlightedPointId(null);

      return;
    }

    setHighlightedPointId(id);

    const highlitedPointData: GeoJSON.Feature | undefined = pointsData.features.find(
      (feature) => feature.properties?.id === id
    );

    if (!highlitedPointData) {
      return;
    }

    const highlightData: GeoJSON.FeatureCollection = {
      ...pointsData,
      features: [highlitedPointData],
    };

    const previousSource = mapRef.current.getSource(MAP_HIGHLIGHTED_POINT_SOURCE_ID);
    const previousLayer = mapRef.current.getLayer(MAP_HIGHLIGHTED_POINT_LAYER_ID);

    // If a previous highlight layer is present, remove source and layer
    if (previousLayer && previousSource) {
      mapRef.current.removeLayer(MAP_HIGHLIGHTED_POINT_LAYER_ID);
      mapRef.current.removeSource(MAP_HIGHLIGHTED_POINT_SOURCE_ID);
    }

    // Add highlight source and layer
    const { source, layer} = extractMapData(highlightData, false);
    addPoints(mapRef, source, layer, false);
  };

  return { handleShowPoints, handleHightlightPoint, renderedPoints, mapContainerRef, mapRef, highlightedPointId };
}