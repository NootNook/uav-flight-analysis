export const fetchAltitude = async (
    environnement: string,
    filename: string
): Promise<TAltitudeObject[]> =>
    fetch(
        `http://localhost:8000/parser/${environnement}/altitude${
            filename == '' ? '' : `?filename=${filename}`
        }`
    ).then((res) => res.json());

export const fetchGps = async (environnement: string, filename: string): Promise<TGPSObject[]> =>
    fetch(
        `http://localhost:8000/parser/${environnement}/gps${
            filename == '' ? '' : `?filename=${filename}`
        }`
    ).then((res) => res.json());

export const fetchFilenames = async (): Promise<string[]> =>
    fetch('http://localhost:8000/filenames').then((res) => res.json());
