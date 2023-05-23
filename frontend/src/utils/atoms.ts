import { atom } from 'jotai';

export const parserOptionsAtom = atom<TParserOptions>({
    environnement: 'airData',
    filename: '',
});

export const urlTileLayerAtom = atom<string>('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png');
