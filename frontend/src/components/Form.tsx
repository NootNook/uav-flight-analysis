import { Stack } from '@chakra-ui/react';
import ParserMenu from './ParserMenu';
import TileLayerMenu from './TileLayerMenu';

const Menu = () => {
    return (
        <Stack spacing={20} direction='row' margin='50px' justifyContent='center'>
            <TileLayerMenu />
            <ParserMenu />
        </Stack>
    );
};

export default Menu;
