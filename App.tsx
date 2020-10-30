import React from "react";
import { Provider } from "react-redux";
import { store } from "./core/store";
import {
  ApplicationProvider, IconRegistry,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { ProfileScreen } from "./components/profileScreen";
import { EvaIconsPack } from  "@ui-kitten/eva-icons";
import { Main } from "./components/main";

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <Main/>
        </Provider>
      </ApplicationProvider>
    </>
  );
}
