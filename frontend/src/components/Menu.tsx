import useFetchJson from '../hooks/useFetchJson';
import { menu } from './styles.css';

const Menu = () => {
    const [data] = useFetchJson("http://localhost:8000/filenames");
    
    return (
        <div className={menu}>
            <select name='environnements' id='environnement-select'>
                <option value=''>-- Choose an environnement --</option>
                <option value='onboardSDK'>OnBoard SDK</option>
                <option value='airData'>AirData</option>
                <option value='DJIParsingLib'>DJI Flight Record Parsing Lib</option>
            </select>
            <select name='filenames' id='filenames-select'>
                <option value=''>-- Choose a file --</option>
                {data.map((filename) => <option value={filename}>{filename}</option>)}
            </select>
            <button type='button'>Run parser</button>
        </div>
    );
};

export default Menu;
