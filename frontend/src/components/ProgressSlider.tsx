import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark } from '@chakra-ui/react';
import { valueSliderAtom } from '../utils/atoms';
import { useAtom } from 'jotai';

const ProgressSlider = ({ orientation, className }: TProgressSlider) => {
    const [valueSlider, setValueSlider] = useAtom(valueSliderAtom);

    return (
        <Slider
            aria-label='slider-ex-1'
            className={className}
            defaultValue={valueSlider}
            orientation={orientation}
            onChange={(e) => setValueSlider(e)}
        >
            <SliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
                0%
            </SliderMark>
            <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                25%
            </SliderMark>
            <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                50%
            </SliderMark>
            <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
                75%
            </SliderMark>
            <SliderMark value={100} mt='1' ml='-2.5' fontSize='sm'>
                100%
            </SliderMark>
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
        </Slider>
    );
};

export default ProgressSlider;
