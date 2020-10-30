import React from "react";
import { Provider } from "react-redux";
import { store } from "./core/store";
import {
  ApplicationProvider,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { LoginScreen } from "./sreens/loginScreen";
import { Main } from "./components/main";

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <Main/>
      </Provider>
    </ApplicationProvider>
  );
}
