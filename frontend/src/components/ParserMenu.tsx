import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { menu } from './styles.css';
import { useAtom } from 'jotai';
import { parserOptionsAtom } from '../utils/atoms';
import { fetchFilenames } from '../utils/api';

const ParserMenu = () => {
    const query = useQuery({
        queryKey: ['filenames'],
        queryFn: fetchFilenames,
    });

    const [, setOptions] = useAtom(parserOptionsAtom);

    const [selectedEnvironnement, setSelectedEnvironnement] =
        useState<string>('');
    const [selectedFilename, setSelectedFilename] = useState<string>('');

    const handleRunParser = () => {
        setOptions({
            environnement: selectedEnvironnement,
            filename: selectedFilename,
        });
    };

    return (
        <div className={menu}>
            <select
                name='environnements'
                id='environnement-select'
                onChange={(e) => setSelectedEnvironnement(e.target.value)}
            >
                <option value=''>-- Choose an environnement --</option>
                <option value='onboardSDK'>OnBoard SDK</option>
                <option value='airData'>AirData</option>
                <option value='DJIParsingLib'>
                    DJI Flight Record Parsing Lib
                </option>
            </select>
            <select
                name='filenames'
                id='filenames-select'
                onChange={(e) => setSelectedFilename(e.target.value)}
            >
                <option value=''>-- Choose a file --</option>
                {query.data?.map((filename) => (
                    <option key={filename} value={filename}>
                        {filename}
                    </option>
                ))}
            </select>
            <button type='button' onClick={handleRunParser}>
                Run parser
            </button>
        </div>
    );
};

export default ParserMenu;
