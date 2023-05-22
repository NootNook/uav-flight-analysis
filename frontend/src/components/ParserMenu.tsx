import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { parserOptionsAtom } from '../utils/atoms';
import { fetchFilenames } from '../utils/api';
import { Select, Button, VStack } from '@chakra-ui/react';

const ParserMenu = () => {
    const [, setOptions] = useAtom(parserOptionsAtom);

    const query = useQuery({
        queryKey: ['filenames', parserOptionsAtom],
        queryFn: fetchFilenames,
        refetchOnWindowFocus: false,
    });

    const [selectedEnvironnement, setSelectedEnvironnement] = useState<string>('');
    const [selectedFilename, setSelectedFilename] = useState<string>('');

    const handleRunParser = () => {
        setOptions({
            environnement: selectedEnvironnement,
            filename: selectedFilename,
        });
    };

    return (
        <VStack flexDirection='column' margin='50px' spacing={5}>
            <Select
                placeholder='Choose an environnement'
                onChange={(e) => setSelectedEnvironnement(e.target.value)}
            >
                <option value='onboardSDK'>OnBoard SDK</option>
                <option value='airData'>AirData</option>
                <option value='DJIParsingLib'>DJI Flight Record Parsing Lib</option>
            </Select>
            <Select
                placeholder='Choose a file'
                onChange={(e) => setSelectedFilename(e.target.value)}
            >
                {query.data?.map((filename) => (
                    <option key={filename} value={filename}>
                        {filename}
                    </option>
                ))}
            </Select>
            <Button colorScheme='blue' onClick={handleRunParser}>
                Run parser
            </Button>
        </VStack>
    );
};

export default ParserMenu;
