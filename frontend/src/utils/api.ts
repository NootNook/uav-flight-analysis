export const fetchFilenames = async (): Promise<string[]> => {
    const raw = await fetch('http://localhost:8000/filenames');
    return (await raw.json()) as string[];
};

export const fetchAltitude = async (
    environnement: string,
    filename: string
): Promise<TAltitudeObject[]> => {
    const raw = await fetch(
        `http://localhost:8000/parser/${environnement}/altitude`
    );
    return (await raw.json()) as TAltitudeObject[];
};

export const fetchGps = async (
    environnement: string,
    filename: string
): Promise<TGPSObject[]> => {
    const raw = await fetch(
        `http://localhost:8000/parser/${environnement}/gps`
    );
    return (await raw.json()) as TGPSObject[];
};

/*export const fetchFilenames = async (): Promise<JSONResponse[]> => {
    return fetch('http://localhost:8000/filenames').then(
        (res) => res.json() as string[]
    );
};

export const fetchAltitude = async (
    environnement: string,
    filename: string
): Promise<JSONResponse[]> => {
    return fetch(
        `http://localhost:8000/parser/${environnement}?filename=${filename}`
    ).then((res) => res.json());
};
*/
