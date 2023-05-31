import { MapContainer, Polyline, TileLayer, Marker, Popup } from 'react-leaflet';
import { BaseIconOptions, Icon, LatLngLiteral } from 'leaflet';
import { useQuery } from '@tanstack/react-query';
import { fetchGps } from '../utils/api';
import { useAtom } from 'jotai';
import { parserOptionsAtom, urlTileLayerAtom } from '../utils/atoms';
import ViewMap from './ViewMap';

const defaultOptionsIcon: BaseIconOptions = {
    iconAnchor: [12, 41],
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
}

const Map = ({ idTab, className }: TMap) => {
    const initCenter: LatLngLiteral = {
        lat: 44.69821684673496,
        lng: -1.1767003924998303,
    };

    const [parserOptions] = useAtom(parserOptionsAtom);
    const [urlTileLayer] = useAtom(urlTileLayerAtom);

    const query = useQuery({
        queryKey: ['gps', parserOptions],
        queryFn: async () => fetchGps(parserOptions.environnement, parserOptions.filename),
        select: (data: TGPSObject[]) => data.map((e) => ({ lat: e.latitude, lng: e.longitude })),
        initialData: [],
        refetchOnWindowFocus: false,
    });

    const chartOptions = { color: '#0C134F' };

    const endIcon = new Icon({
        iconUrl: 'marker-icon-red.png',
        ...defaultOptionsIcon
    });

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
                    <Marker position={query.data[0]} >
                        <Popup>🏎️ Start</Popup>
                    </Marker>
                    <Marker position={query.data[query.data.length - 1]} icon={endIcon}>
                        <Popup>🏁 End</Popup>
                    </Marker>
                    <Polyline pathOptions={chartOptions} positions={query.data} />
                </>
            )}
        </MapContainer>
    );
};

export default Map;
