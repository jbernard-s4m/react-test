import 'jest';
import { MAP_BASE_POINTS_LAYER_ID, MAP_BASE_POINTS_SOURCE_ID, MAP_HIGHLIGHTED_POINT_LAYER_ID, MAP_HIGHLIGHTED_POINT_SOURCE_ID } from '../shared/constants';
import { MapDefaultPointStyle, MapHighlightedPointStyle } from '../styles/styles';
import { extractMapData } from './helpers';

const mockGeoJsonData: GeoJSON.FeatureCollection = {
  "type":"FeatureCollection",
   "features":[
      {
         "type":"Feature",
         "geometry":{
            "type":"Point",
            "coordinates":[
               3.013359102808291,
               48.384286887780036
            ]
         },
         "properties":{
            "id":1,
            "name":"Point 1",
            "category":"B"
         }
      },
      {
         "type":"Feature",
         "geometry":{
            "type":"Point",
            "coordinates":[
               2.4692029273232787,
               49.07538488392326
            ]
         },
         "properties":{
            "id":2,
            "name":"Point 2",
            "category":"B"
         }
      },]
}

it('extracts well formatted base map data and layer', () => {
  const expectedMapData = {
    source: {
      type: "geojson",
      data: mockGeoJsonData,
    },
    layer: {
      id: MAP_BASE_POINTS_LAYER_ID,
      source: MAP_BASE_POINTS_SOURCE_ID,
      ...MapDefaultPointStyle,
    }
  };

  const receivedMapData = extractMapData(mockGeoJsonData, true);

  expect(receivedMapData).toEqual(expectedMapData);
});

it('extracts well formatted highlight map data and layer', () => {
  const expectedMapData = {
    source: {
      type: "geojson",
      data: mockGeoJsonData,
    },
    layer: {
      id: MAP_HIGHLIGHTED_POINT_LAYER_ID,
        source: MAP_HIGHLIGHTED_POINT_SOURCE_ID,
        ...MapHighlightedPointStyle,
    }
  };

  const receivedMapData = extractMapData(mockGeoJsonData, false);

  expect(receivedMapData).toEqual(expectedMapData);
});