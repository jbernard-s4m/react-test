import { GeoJSONFeature } from "mapbox-gl";
import {
  PointListItemHighlightedStyle,
  PointListItemStyle,
} from "../styles/styles";

interface PointListItemProps {
  point: GeoJSONFeature;
  onPointClick: (id: number) => void;
  isHighlighted: boolean;
}

export const PointListItem = ({
  point,
  onPointClick,
  isHighlighted,
}: PointListItemProps) => (
  <div
    onClick={() => onPointClick(point.properties?.id)}
    style={isHighlighted ? PointListItemHighlightedStyle : PointListItemStyle}
  >
    <span>{point.properties?.name}</span>
  </div>
);
