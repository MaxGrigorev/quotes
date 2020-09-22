import { combineReducers } from "redux";

import { quotes } from "./quotes";

const rootReducer = combineReducers({
  quotes,
});

export { rootReducer };

export type AppState = ReturnType<typeof rootReducer>;
