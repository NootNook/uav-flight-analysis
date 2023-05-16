import { style, globalStyle } from '@vanilla-extract/css';

export const app = style({
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
});

export const map = style({
    margin: '1%',
    height: '96%',
    width: '50%',
});

export const metrics = style({
    margin: '1%',
    width: '50vw',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
});

export const chart = style({
    //position: "relative",
    height: '40vh',
    //width: '50vw'
});

export const menu = style({
    display: 'flex',
    flexDirection: 'column',
    margin: '50px',
});

globalStyle(`${menu} > select`, {
    margin: '10px',
});

globalStyle('body, html', {
    margin: 0,
});

globalStyle('button', {
    margin: '20px',
    height: '40px',
    width: 'auto',
});
