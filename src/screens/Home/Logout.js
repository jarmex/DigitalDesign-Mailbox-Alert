import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import { withNavigation } from 'react-navigation';
import LogoutImage from '../../../assets/logout.png';

function Logout(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            props.navigation.navigate('Auth');
          });
      }}
    >
      <View
        style={{
          width: 25,
          height: 25,
          marginRight: 12,
        }}
      >
        <Image
          source={LogoutImage}
          resizeMode="contain"
          style={{ width: 18, height: 18 }}
        />
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(Logout);
