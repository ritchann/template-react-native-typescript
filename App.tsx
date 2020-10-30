import React, { useMemo, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./core/store";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { ProfileScreen } from "./sreens/profileScreen";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Main } from "./components/main";
import { TestScreen } from "./sreens/testScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon,
} from "@ui-kitten/components";
import { LoginScreen } from "./sreens/loginScreen";

const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  const [index, setIndex] = useState(0);

  useMemo(() => console.log(index), [index]);

  const BottomTabBar = () => (
    <BottomNavigation
      selectedIndex={index}
      onSelect={(index) => setIndex(index)}
    >
      <BottomNavigationTab title="LOGIN" />
      <BottomNavigationTab title="SOS" />
      <BottomNavigationTab title="SOS" />
    </BottomNavigation>
  );

  const TabNavigator = () => (
    <Navigator tabBar={(props) => <BottomTabBar />}>
      {index === 0 && <Screen name="LOGIN" component={TestScreen} />}
      {index === 1 && <Screen name="SOS" component={LoginScreen} />}
    </Navigator>
  );

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <ProfileScreen />
        </Provider>
      </ApplicationProvider>
    </>
  );
}
