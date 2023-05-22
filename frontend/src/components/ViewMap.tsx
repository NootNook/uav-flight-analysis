import { useMap } from "react-leaflet";

const ViewMap = ({isSuccess, position}: TViewMap) => {
    const map = useMap();

    if(isSuccess && position != undefined)
        map.setView(position, map.getZoom());

    return null;
};

export default ViewMap