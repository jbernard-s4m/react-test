import { SourceSpecification, Layer, Map } from "mapbox-gl";
import { MAP_BASE_POINTS_LAYER_ID, MAP_BASE_POINTS_SOURCE_ID, MAP_HIGHLIGHTED_POINT_LAYER_ID, MAP_HIGHLIGHTED_POINT_SOURCE_ID } from "../shared/constants";
import { MapDefaultPointStyle, MapHighlightedPointStyle } from "../styles/styles";
import { MapData } from "../shared/types";

export const extractMapData = (data: GeoJSON.FeatureCollection, isBaseLayer: boolean = true ): MapData => {
    const source: SourceSpecification = {
      type: "geojson",
      data,
    };

    const layer: Layer = isBaseLayer ? {
      id: MAP_BASE_POINTS_LAYER_ID,
      source: MAP_BASE_POINTS_SOURCE_ID,
      ...MapDefaultPointStyle,
    } : {
        id: MAP_HIGHLIGHTED_POINT_LAYER_ID,
        source: MAP_HIGHLIGHTED_POINT_SOURCE_ID,
        ...MapHighlightedPointStyle,
      };

    return { source, layer };
};

export const addPoints = (mapRef: React.MutableRefObject<Map | undefined>, source: SourceSpecification, layer: Layer, isBaseLayer: boolean = true) => {
    mapRef.current?.addSource(isBaseLayer ? MAP_BASE_POINTS_SOURCE_ID : MAP_HIGHLIGHTED_POINT_SOURCE_ID, source);
    mapRef.current?.addLayer(layer);
};