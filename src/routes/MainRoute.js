import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../screens/Home/HomeScreen';
import CheckResultPage from '../screens/CheckResult/CheckResultPage';
import LoginPage from '../screens/Login/AuthenticateUser';
import LoadingView from '../screens/Loading/Loading';

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Result: CheckResultPage,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#5190d3',
        shadowOpacity: 0,
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        elevation: 0,
      },
      headerTintColor: '#FFFFFF',
    },
  },
);

const AuthStack = createStackNavigator({ SignIn: LoginPage });

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: LoadingView,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export const AppContainer = createAppContainer(switchNavigator);
export default createAppContainer(switchNavigator);
