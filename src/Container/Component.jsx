import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';

const styled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 0 auto;
`;

const Container = ({ children, theme }) => (
  <styled>
    <span>{theme}</span>
    {children}
  </styled>
);

export default hot(Container);
