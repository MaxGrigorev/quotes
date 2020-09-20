import { createStore, applyMiddleware, Store, compose } from "redux";
import thunk from "redux-thunk";

import { AppState, rootReducer } from "./ducks";
import { NativeModules } from "react-native";
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

import appMetaInfo from "../app.json";

if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const scriptHostname = scriptURL.split("://")[1].split(":")[0];

  Reactotron.configure({
    name: appMetaInfo.expo.name,
    host: scriptHostname,
  })
    .useReactNative({
      editor: false, // there are more options to editor
      errors: { veto: () => false }, // or turn it off with false
      overlay: false, // just turning off overlay
    })
    .use(reactotronRedux())
    .connect();
}

const composeItems = [];

composeItems.push(applyMiddleware(thunk));

if (__DEV__) {
  composeItems.push(Reactotron.createEnhancer());
}

const store: Store<AppState> = createStore(
  rootReducer,
  compose(...composeItems)
);

export { store };
