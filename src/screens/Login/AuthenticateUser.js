import React, { useState } from 'react';
import { Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import firebase from 'react-native-firebase';
import { Header } from 'react-navigation';

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
  const [username, setUsername] = useState('isawjames@outlook.com');
  const [password, setPassword] = useState('Testing123');
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Header.HEIGHT + 20} // adjust the value here if you need more padding
      style={{ flex: 1 }}
      behavior="padding"
    >
      <ScrollView contentContainerStyle={{ justifyContent: 'flex-end', flex: 1 }}>
        <LoginView>
          <ImageView />
          <WelcomeText>Welcome,</WelcomeText>
          <SignInText>sign in to continue</SignInText>
          <UserNameInput
            autoCapitalize="none"
            placeholder="Email Address"
            onChangeText={(uname) => setUsername(uname)}
            value={username}
          />
          <PasswordInput
            autoCapitalize="none"
            secureTextEntry
            placeholder="Password"
            onChangeText={(passwd) => setPassword(passwd)}
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
                .catch((err) => {
                  console.log(err); //eslint-disable-line

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
            Designed by James Amo for Digital Design Class Project. Use with care!!!!
          </PrivacyMessage>
        </LoginView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

AuthenticateUser.navigationOptions = () => ({
  header: null,
});

export default AuthenticateUser;
