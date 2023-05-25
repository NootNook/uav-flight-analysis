import { useMap } from 'react-leaflet';
import { indexTabsAtom } from '../utils/atoms';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Map } from 'leaflet';

const ViewMap = ({ isSuccess, position }: TViewMap) => {
    const map: Map = useMap();

    const [indexValue] = useAtom(indexTabsAtom);
    const idContainer = parseInt(map.getContainer().id);
    useEffect(() => {
        if (indexValue === idContainer) {
            map.invalidateSize();
        }
    }, [indexValue, idContainer, map]);

    if (isSuccess && position != undefined) map.setView(position, map.getZoom());

    return null;
};

export default ViewMap;
