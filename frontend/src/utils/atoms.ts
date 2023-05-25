import { atom } from 'jotai';

export const parserOptionsAtom = atom<TParserOptions>({
    environnement: 'onboardSDK',
    filename: 'demo.csv',
});

export const urlTileLayerAtom = atom<string>('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png');
