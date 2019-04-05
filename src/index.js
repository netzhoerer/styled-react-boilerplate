import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import 'modern-normalize/modern-normalize.css';
import Container from './Container';
import Header from './components/header';
import Counter from './components/counter';

// Install Service Worker
if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install();
}

// Global Style
const GlobalStyle = createGlobalStyle`
  body {
    background: white;
    color: black;
    padding: 0;
    margin:0;
    width: 100vw;
    height: 100vh;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeSpeed;
    word-wrap: break-word
  }
  #root {
    width: 100vw;
    height: 100vh;
  }
`;

// Main page
const App = () => (
  <Container>
    <Header>Hello World ⚡</Header>
    <Counter />
    <GlobalStyle />
  </Container>
);

// Render page
ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
