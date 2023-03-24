import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        font-family: sans-serif;
        font-family: 'Cute Font', cursive;
        font-family: 'Noto Sans KR', sans-serif;
    }
`;

export default GlobalStyles;
