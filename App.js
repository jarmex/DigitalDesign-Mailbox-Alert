import React from 'react';
import { ThemeProvider } from 'styled-components';
import MainRoute from './src/routes/MainRoute';
import theme from './src/theme/index';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainRoute />
    </ThemeProvider>
  );
}
