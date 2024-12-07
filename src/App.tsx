import React from "react";
import { InteractiveMap } from "./components/InteractiveMap";
import { VisiblePoints } from "./components/VisiblePoints";
import { useMapPoints } from "./hooks/useMapPoints";
import { AppContainerStyles } from "./styles/styles";

export const App: React.FC = () => {
  const {
    handleShowPoints,
    handleHightlightPoint,
    renderedPoints,
    mapContainerRef,
    mapRef,
    highlightedPointId,
  } = useMapPoints();

  return (
    <div style={AppContainerStyles}>
      <InteractiveMap mapContainerRef={mapContainerRef} mapRef={mapRef} />
      <VisiblePoints
        onShowPoints={handleShowPoints}
        onHightlightPoint={handleHightlightPoint}
        renderedPoints={renderedPoints}
        selectedPointId={highlightedPointId}
      />
    </div>
  );
};
