import { createGlobalStyle } from 'styled-components';

    export default createGlobalStyle`
    *,

    :root {
        --font-header-option-one: 'Dela Gothic One', cursive;
        --font-header-option-two: 'Russo One', sans-serif;
        --font-body: 'IBM Plex Mono', monospace;
    }

    html, body {
        max-width: 100vw;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    /* ol, ul {
        list-style: none;
    } */
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    body {
        font-family: sans-serif;
    }

    button {
        border: none;
    }

    `;