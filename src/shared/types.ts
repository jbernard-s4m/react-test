import { Layer, SourceSpecification } from "mapbox-gl"

export type MapData = {
    source: SourceSpecification,
    layer: Layer,
}