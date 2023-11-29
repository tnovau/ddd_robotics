export type ControlModel = {
    id: string
    name: string
}

export type FeatureModel = {
    id: string
    name: string
    controls: ControlModel[]
}

export type PartModel = {
    id: string
    name: string
    features: FeatureModel[]
}