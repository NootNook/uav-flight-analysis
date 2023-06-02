export const fetchAltitude = async (filename: string): Promise<TAltitudeObject[]> => {
    const urlSuffix = filename == '' ? '' : `?filename=${filename}`;
    const res = await fetch(`http://localhost:8000/parser/altitude${urlSuffix}`);
    return (await res.json()) as TAltitudeObject[];
};

export const fetchGps = async (filename: string): Promise<TGPSObject[]> => {
    const urlSuffix = filename == '' ? '' : `?filename=${filename}`;
    const res = await fetch(`http://localhost:8000/parser/gps${urlSuffix}`);
    return (await res.json()) as TGPSObject[];
};

export const fetchDatabase = async (): Promise<TDatabase> => {
    const res = await fetch('http://localhost:8000/filenames');
    return (await res.json()) as TDatabase;
};
