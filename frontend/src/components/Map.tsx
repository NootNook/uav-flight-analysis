import { MapContainer, Polyline, TileLayer, Marker, Popup } from 'react-leaflet';
import { BaseIconOptions, Icon, LatLngLiteral } from 'leaflet';
import { useQuery } from '@tanstack/react-query';
import { fetchGps } from '../utils/api';
import { useAtomValue } from 'jotai';
import { parserOptionsAtom, urlTileLayerAtom, valueSliderAtom } from '../utils/atoms';
import ViewMap from './ViewMap';

const defaultOptionsIcon: BaseIconOptions = {
    iconAnchor: [12, 41],
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
};

const getPercentageOfArray = (array: LatLngLiteral[], percentage: number) => {
    const numElements = Math.ceil(array.length * (percentage / 100));
    return array.slice(0, numElements);
};

const Map = ({ idTab, className }: TMap) => {
    const initCenter: LatLngLiteral = {
        lat: 44.69821684673496,
        lng: -1.1767003924998303,
    };

    const parserOptions = useAtomValue(parserOptionsAtom);
    const urlTileLayer = useAtomValue(urlTileLayerAtom);
    const valueSlider = useAtomValue(valueSliderAtom);

    const query = useQuery({
        queryKey: ['gps', parserOptions],
        queryFn: async () => fetchGps(parserOptions.filename),
        select: (data: TGPSObject[]): LatLngLiteral[] =>
            data.map((e) => ({ lat: e.latitude, lng: e.longitude })),
        initialData: [],
        refetchOnWindowFocus: false,
    });

    const chartOptions = { color: 'red' };

    const endIcon = new Icon({
        iconUrl: 'marker-icon-red.png',
        ...defaultOptionsIcon,
    });

    const formattedArray = getPercentageOfArray(query.data, valueSlider);

    return (
        <MapContainer
            id={idTab.toString()}
            className={className}
            center={initCenter}
            zoom={15}
            scrollWheelZoom={true}
        >
            <ViewMap isSuccess={!query.isFetching} position={query.data[0]} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={urlTileLayer}
                maxNativeZoom={22}
                maxZoom={22} //100 - 500
            />
            {!query.isFetching && (
                <>
                    <Marker position={query.data[0]}>
                        <Popup>🏎️ Start</Popup>
                    </Marker>
                    <Marker position={query.data[query.data.length - 1]} icon={endIcon}>
                        <Popup>🏁 End</Popup>
                    </Marker>
                    <Polyline pathOptions={chartOptions} positions={formattedArray} />
                </>
            )}
        </MapContainer>
    );
};

export default Map;
