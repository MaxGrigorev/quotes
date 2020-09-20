import { combineReducers } from "redux";

import { example } from "./example";

const rootReducer = combineReducers({
  example,
});

export { rootReducer };

export type AppState = ReturnType<typeof rootReducer>;
