import { GeoJSONFeature } from "mapbox-gl";
import {
  ButtonStyle,
  VisiblePointsContainerStyle,
  PointListContainerStyle,
} from "../styles/styles";
import { PointListItem } from "./PointListItem";

interface VisiblePointsProps {
  onShowPoints: () => void;
  onHightlightPoint: (id: number) => void;
  renderedPoints: GeoJSONFeature[];
  selectedPointId: number | null;
}

export const VisiblePoints = ({
  onShowPoints,
  renderedPoints,
  onHightlightPoint,
  selectedPointId,
}: VisiblePointsProps) => (
  <div style={VisiblePointsContainerStyle}>
    <div>
      <h1>Mapbox Test Boilerplate</h1>
      <button style={ButtonStyle} onClick={onShowPoints}>
        Afficher les points visibles
      </button>

      <div style={PointListContainerStyle}>
        {renderedPoints.length !== 0
          ? renderedPoints.map((pointData: GeoJSONFeature) => (
              <PointListItem
                key={pointData.properties?.id}
                point={pointData}
                onPointClick={onHightlightPoint}
                isHighlighted={selectedPointId === pointData.properties?.id}
              />
            ))
          : null}
      </div>
    </div>
  </div>
);
