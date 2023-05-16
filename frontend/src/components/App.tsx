import { MapContainer, TileLayer } from 'react-leaflet';
import { app, metrics, map } from './styles.css';
import { LatLngLiteral } from 'leaflet';
import Chart from './Chart';
import Menu from './Menu';

const App = () => {
    const position: LatLngLiteral = { lat: 44.80719137279948, lng: -0.5979310058975865 };

    return (
        <div className={app}>
            <MapContainer className={map} center={position} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
            </MapContainer>
            <div className={metrics}>
                <Chart />
                <Menu />
            </div>
        </div>
    );
};

export default App;
