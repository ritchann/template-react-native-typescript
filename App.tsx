import React from "react";
import { Provider } from "react-redux";
import { Main } from "./components/main";
import { store } from "./core/store";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
