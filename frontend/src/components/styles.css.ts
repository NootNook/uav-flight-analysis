import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const tabsHeader = style({
    height: '42px',
    width: '100vw',
});

export const dashboard = style({
    padding: '16px',
    height: calc.subtract('100vh', '42px'),
    width: '100vw',
});

export const mapDashboard = style({
    height: '100%',
    width: '50%',
});

export const mapFullscreen = style({
    height: calc.subtract('100vh', '42px'),
    width: '100vw',
});

export const chartDashboard = style({
    height: '50vh',
    width: '50vw',
});

export const chartFullscreen = style({
    height: '80vh',
    width: '80vw',
});