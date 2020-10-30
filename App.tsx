import React from "react";
import { Provider } from "react-redux";
import { Main } from "./components/main";
import { store } from "./core/store";
import { Button } from "@ui-kitten/components";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <Provider store={store}>
      <Main />
    </Provider>
    </ApplicationProvider>
  );
}
