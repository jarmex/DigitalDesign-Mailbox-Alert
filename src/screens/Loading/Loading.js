import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, ActivityIndicator } from 'react-native';

export default class LoadingView extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
