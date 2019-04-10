import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import MailBoxImage from '../../../assets/mailbox.png';
import RightArrow from '../../../assets/arrowright.png';

export const LoginView = styled.View`
  flex: 1;
  margin-left: 45px;
  margin-top: 120px;
`;

const LogoView = styled.View`
  padding-bottom: 15px;
`;
const ImageLogo = styled.Image`
  width: 42px;
  height: 42px;
`;

export const ImageView = () => (
  <LogoView>
    <ImageLogo source={MailBoxImage} resizeMode="contain" />
  </LogoView>
);

export const WelcomeText = styled.Text`
  color: black;
  font-size: 28;
  padding-vertical: 5px;
`;
export const SignInText = styled.Text`
  color: gray;
  font-size: 25;
  margin-bottom: 50px;
`;

export const UserNameInput = styled.TextInput`
  height: 50px;
  border-bottom-width: 1px;
  border-color: #cccccc;
  margin-bottom: 20px;
`;

export const PasswordInput = styled.TextInput`
  height: 50px;
  border-bottom-width: 1px;
  border-color: #cccccc;
  margin-bottom: 50px;
`;

const GetStartText = styled.Text`
  padding-right: 5px;
`;

const RightArrowImage = styled.Image`
  width: 20px;
  height: 10px;
`;

const GetStartedView = styled.View`
  flex-direction: row;
  width: 155px;
  height: 40px;
  background-color: #f3f3f3;
  border-radius: 5;
  justify-content: center;
  align-items: center;
`;

export const GetStartedButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <GetStartedView>
      <GetStartText>{title}</GetStartText>
      <RightArrowImage source={RightArrow} />
    </GetStartedView>
  </TouchableOpacity>
);

export const PrivacyMessage = styled.Text`
  text-align: center;
  position: absolute;
  height: 70;
  margin-right: 45;
  bottom: 0;
  font-size: 12;
  color: #d3d3d3;
`;
