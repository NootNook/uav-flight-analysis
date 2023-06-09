interface LatLngLiteral {
    lat: number;
    lng: number;
}

interface TParserOptions {
    filename: string;
}

interface TGPSObject {
    timestamp: number;
    latitude: number;
    longitude: number;
}

interface TAltitudeObject {
    timestamp: number;
    wgs84_ellipsoid_height: number;
    orthometric_height: number;
}

interface TViewMap {
    isSuccess: boolean;
    position: LatLngLiteral | undefined;
}

interface TMap {
    idTab: number;
    className: string;
}

interface TChart {
    className?: string;
}

interface TProgressSlider extends TChart {
    orientation: 'horizontal' | 'vertical' | undefined;
}

type TDatabase = Record<string, string[]>;
