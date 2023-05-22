import { atom } from 'jotai';

//atom<ParserOptions>
export const parserOptionsAtom = atom<TParserOptions>({
    environnement: 'airData',
    filename: '',
});
