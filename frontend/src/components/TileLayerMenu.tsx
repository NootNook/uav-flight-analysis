import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { urlTileLayerAtom } from '../utils/atoms';
import { useState } from 'react';

const tileList: Record<string, string> = {
    '1': 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
    '2': 'https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga',
    '3': 'https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga',
};

const TileLayerMenu = () => {
    const [, setUrlTileLayer] = useAtom(urlTileLayerAtom);
    const [checkboxChecked, setCheckboxChecked] = useState('1');

    const onChange = (values: string[]) => {
        const [newIndex] = values.filter((e) => e !== checkboxChecked);
        setCheckboxChecked(newIndex);

        const newTileLayer = tileList[newIndex];
        setUrlTileLayer(newTileLayer);
    };

    return (
        <Stack spacing={5} direction='column'>
            <CheckboxGroup colorScheme='green' value={[checkboxChecked]} onChange={onChange}>
                <Checkbox value={'1'} disabled={checkboxChecked === '1'}>
                    OpenStreetMap
                </Checkbox>
                <Checkbox value={'2'} disabled={checkboxChecked === '2'}>
                    Google Map normal
                </Checkbox>
                <Checkbox value={'3'} disabled={checkboxChecked === '3'}>
                    Google Map satellite
                </Checkbox>
            </CheckboxGroup>
        </Stack>
    );
};

export default TileLayerMenu;
