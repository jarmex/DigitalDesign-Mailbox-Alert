import React from 'react';
import styled from 'styled-components';
import { Image, TouchableOpacity } from 'react-native';
import Globe from '../../../assets/globe.png';
import SettingImage from '../../../assets/albums.png';

export const ImageContainer = styled.ImageBackground`
  flex: 1;
`;
export const HeaderTitle = styled.Text`
  top: 70px;
  text-align: center;
  color: white;
  font-size: 32;
`;

export const ButtomBar = styled.View`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
`;
export const MenuIconView = styled.View`
  position: absolute;
  bottom: 65px;
  height: 120px;
  left: 0;
  right: 0;
`;

export const IconMenu = styled.View`
  shadow-color: #ccc;
  shadow-offset: 2px 2px;
  shadow-opacity: 1;
  shadow-radius: 2px;
  elevation: 4;
  width: 75;
  height: 75;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background-color: #5190d3;
`;

export const IconText = styled.Text`
  color: white;
  font-size: 13;
`;

export const Flatitem = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <IconMenu>
        <Image source={Globe} resizeMode="contain" />
        <IconText>{title}</IconText>
      </IconMenu>
    </TouchableOpacity>
  );
};

export const data = [
  // { id: '1', title: 'History', icon: 'check' },
  { id: '2', title: 'CHECK', icon: 'check' },
  // { id: '3', title: 'Setting', icon: 'check' },
];

const SettingView = styled.View`
  margin-left: 16px;
  width: 25px;
  height: 25px;
`;

export const SettingButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <SettingView>
        <Image
          source={SettingImage}
          resizeMode="contain"
          style={{ width: 22, height: 22 }}
        />
      </SettingView>
    </TouchableOpacity>
  );
};
