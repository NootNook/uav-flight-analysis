export const fetchAltitude = async (
    environnement: string,
    filename: string
): Promise<TAltitudeObject[]> => {
    const urlSuffix = filename == '' ? '' : `?filename=${filename}`;
    const res = await fetch(`http://localhost:8000/parser/${environnement}/altitude${urlSuffix}`);
    return (await res.json()) as TAltitudeObject[];
};

export const fetchGps = async (environnement: string, filename: string): Promise<TGPSObject[]> => {
    const urlSuffix = filename == '' ? '' : `?filename=${filename}`;
    const res = await fetch(`http://localhost:8000/parser/${environnement}/gps${urlSuffix}`);
    return (await res.json()) as TGPSObject[];
};

export const fetchFilenames = async (): Promise<string[]> => {
    const res = await fetch('http://localhost:8000/filenames');
    return (await res.json()) as string[];
};
