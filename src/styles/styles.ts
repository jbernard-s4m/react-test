// App

export const AppContainerStyles: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
};

/*************************************************************************************************************************/

// Interactive Map

import { Layer } from "mapbox-gl";

export const InteractiveMapContainerStyle: React.CSSProperties = {
  width: "100vw",
  height: "60vh",
};

export const MapDefaultPointStyle: Pick<Layer, 'type' | 'paint'> = {
  type: "circle",
  paint: {
    "circle-radius": 4,
    "circle-stroke-width": 2,
    "circle-color": "gray",
    "circle-stroke-color": "white",
  },
}

export const MapHighlightedPointStyle: Pick<Layer, 'type' | 'paint'> = {
  type: "circle",
  paint: {
    "circle-radius": 6,
    "circle-stroke-width": 4,
    "circle-color": "yellow",
    "circle-stroke-color": "white",
  },
}

/*************************************************************************************************************************/

// Buttons

export const ButtonStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '2rem',
  borderStyle: 'none',
  boxShadow: 'rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0',
  boxSizing: 'border-box',
  color: '#3c4043',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '500',
  height: '3rem',
  padding: '2px 1rem',
  textAlign: 'center',
  marginBottom: '1rem'
};

/*************************************************************************************************************************/

// Visible Points

export const VisiblePointsContainerStyle: React.CSSProperties = {
  height: "40vh",
  padding: '0 1rem',
  marginBottom: '1rem'
};

/*************************************************************************************************************************/

// Points List

export const PointListContainerStyle: React.CSSProperties  = {
  maxHeight: "8rem",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  overflowY: "scroll",
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '.25rem',
  padding: '1rem',
  boxShadow: 'rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0',
};

export const PointListItemStyle: React.CSSProperties  = {
  alignItems: 'center',
  backgroundColor: '#fff',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '.25rem',
  boxShadow: 'rgba(0, 0, 0, 0.02) 0 1px 3px 0',
  boxSizing: 'border-box',
  color: 'rgba(0, 0, 0, 0.85)',
  cursor: 'pointer',
  fontSize: '0.8rem',
  padding: '5px 1rem'
};

export const PointListItemHighlightedStyle: React.CSSProperties  = {
  ...PointListItemStyle,
  backgroundColor: 'yellow',
};

/*************************************************************************************************************************/
