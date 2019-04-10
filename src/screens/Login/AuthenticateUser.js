import React, { useState } from 'react';
import { Alert } from 'react-native';
import firebase from 'react-native-firebase';

import {
  LoginView,
  ImageView,
  WelcomeText,
  SignInText,
  UserNameInput,
  PasswordInput,
  GetStartedButton,
  PrivacyMessage,
} from './styl';

function AuthenticateUser(props) {
  const { navigation } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <LoginView>
      <ImageView />
      <WelcomeText>Welcome,</WelcomeText>
      <SignInText>sign in to continue</SignInText>
      <UserNameInput
        autoCapitalize="none"
        placeholder="Email Address"
        onChangeText={(username) => setUsername(username)}
        value={username}
      />
      <PasswordInput
        autoCapitalize="none"
        secureTextEntry
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
        value={password}
      />
      <GetStartedButton
        title="Get Started"
        onPress={() => {
          // validate the username and password
          firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .then(() => {
              navigation.navigate('App');
            })
            .catch((error) => {
              // create user
              firebase
                .auth()
                .createUserWithEmailAndPassword(username, password)
                .then(() => {
                  navigation.navigate('App');
                })
                .catch(() => {
                  Alert.alert(
                    'Sign/Sign Up Error',
                    'Unable to sign in to the application. Check and try later',
                  );
                });
            });
        }}
      />
      <PrivacyMessage>
        Designed by James Amo for Digital Design Class Project. Use with
        care!!!!
      </PrivacyMessage>
    </LoginView>
  );
}

AuthenticateUser.navigationOptions = () => ({
  header: null,
});

export default AuthenticateUser;
