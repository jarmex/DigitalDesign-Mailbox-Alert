import React from 'react';
import { FlatList } from 'react-native';
import bkImage from '../../../assets/yosemite.png';
import {
  ImageContainer,
  HeaderTitle,
  ButtomBar,
  SettingButton,
  MenuIconView,
  Flatitem,
  data,
} from './styl';
import LogoutButton from './Logout';

function HomeScreen({ navigation }) {
  return (
    <ImageContainer source={bkImage}>
      <HeaderTitle>Auto Mailbox Alert</HeaderTitle>
      <ButtomBar />
      <MenuIconView>
        <FlatList
          horizontal
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'space-around',
            flexGrow: 1,
          }}
          data={data}
          renderItem={({ item }) => (
            <Flatitem
              title={item.title}
              onPress={() => navigation.navigate('Result')}
            />
          )}
          keyExtractor={({ id }) => id}
        />
      </MenuIconView>
    </ImageContainer>
  );
}

HomeScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  // header: null,
  const { headerStyle } = navigationOptions;
  return {
    headerStyle: {
      ...headerStyle,
    },
    headerLeft: <SettingButton onPress={() => navigation.navigate('Result')} />,
    headerRight: <LogoutButton />,
  };
};

export default HomeScreen;
