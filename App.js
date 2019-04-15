import React from 'react';
import { Alert } from 'react-native';
import { ThemeProvider } from 'styled-components';
import MainRoute from './src/routes/MainRoute';
import theme from './src/theme/index';
import { useMessaging } from './src/hooks';

export default function App() {
  // use messaging hook
  const [token, notification] = useMessaging();

  // log output of the notication object
  console.log(token); // eslint-disable-line

  if (notification) {
    Alert.alert(notification.title, notification.body);
    console.log('================================================');
    console.log(notification);
    console.log('================================================');
  }
  return (
    <ThemeProvider theme={theme}>
      <MainRoute />
    </ThemeProvider>
  );
}
