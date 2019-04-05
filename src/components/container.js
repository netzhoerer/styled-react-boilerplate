import styled from 'styled-components';
import {hot} from 'react-hot-loader/root';

// Flexbox container
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 0 auto;
`;

export default hot(Container);
