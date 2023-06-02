import { Divider, Stack, Text } from '@chakra-ui/react';
import ParserMenu from './ParserMenu';
import TileLayerMenu from './TileLayerMenu';
import ProgressSlider from './ProgressSlider';
import { progressSlider } from './styles.css';

const Menu = () => {
    return (
        <Stack spacing={10} direction='column'>
            <Stack direction='column'>
                <Text fontSize='md' whiteSpace='nowrap'>
                    UAV trajectory slider
                </Text>
                <ProgressSlider orientation='horizontal' className={progressSlider} />
            </Stack>
            <Divider />
            <Stack spacing={20} direction='row' margin='50px' justifyContent='center'>
                <TileLayerMenu />
                <ParserMenu />
            </Stack>
        </Stack>
    );
};

export default Menu;
