import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';
import { useQuery } from '@tanstack/react-query';
import { fetchGps } from '../utils/api';
import { useAtom } from 'jotai';
import { parserOptionsAtom, urlTileLayerAtom } from '../utils/atoms';
import ViewMap from './ViewMap';

const Map = ({ className }: TMap) => {
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

    const limeOptions = { color: 'red' };

    return (
        <MapContainer className={className} center={initCenter} zoom={15} scrollWheelZoom={true}>
            <ViewMap isSuccess={query.isSuccess} position={query.data[0]} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={urlTileLayer}
                maxNativeZoom={22}
                maxZoom={22} //100 - 500
            />
            <Polyline pathOptions={limeOptions} positions={query.data} />
        </MapContainer>
    );
};

export default Map;
