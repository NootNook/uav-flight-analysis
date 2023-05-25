import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const mapDashboard = style({
    height: '100%',
    width: '50%',
});

export const mapFullscreen = style({
    height: calc.subtract("100vh", "42px"),
    width: '100vw',
});

export const chart = style({
    height: '40vh',
    width: '50vw',
});
