import React from "react";
import { Provider } from "react-redux";
import { store } from "./core/store";
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconRegistry,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { ProfileScreen } from "./sreens/profileScreen";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen } from "./sreens/loginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { SOSScreen } from "./sreens/sosScreen";
import { LogBox } from 'react-native';

export default function App() {
  const Tab = createBottomTabNavigator();
  LogBox.ignoreAllLogs();

  const HomeIcon = (props: any) => <Icon {...props} name="home-outline" />;

  const PersonIcon = (props: any) => <Icon {...props} name="person-outline" />;

  const AlertIcon = (props: any) => (
    <Icon {...props} name="alert-triangle-outline" />
  );

  const BottomTabBar = ({
    navigation,
    state,
  }: {
    navigation: any;
    state: any;
  }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={HomeIcon} />
      <BottomNavigationTab icon={AlertIcon} />
      <BottomNavigationTab icon={PersonIcon} />
    </BottomNavigation>
  );

  const TabNavigator = () => (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="HOME" component={LoginScreen} />
      <Tab.Screen name="SOS" component={SOSScreen} />
      <Tab.Screen name="PROFILE" component={ProfileScreen} />
    </Tab.Navigator>
  );

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </Provider>
      </ApplicationProvider>
    </>
  );
}
