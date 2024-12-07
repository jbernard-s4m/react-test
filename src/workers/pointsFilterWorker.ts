self.onmessage = ({data}) => {
  const pointsData: GeoJSON.FeatureCollection<GeoJSON.Point> = data;

  const displayedData: GeoJSON.FeatureCollection = {
    ...pointsData,
    features: [...pointsData.features].filter(
      (x) => x.geometry.coordinates[1] > 48.8534
    ),
  };

  self.postMessage(displayedData);
};

export {};