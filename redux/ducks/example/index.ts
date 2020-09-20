import { Reducer, Dispatch } from "redux";

import { State } from "./types";

// Actions
const SET_EXAMPLE = "userStatus/SET_EXAMPLE";
const SET_INITIAL_EXAMPLE = "userStatus/SET_INITIAL_EXAMPLE";

interface AbstractAction {
  type: string;
}

interface ExampleAction_Payload extends AbstractAction {
  payload: { example: number };
}

type Action = ExampleAction_Payload;

const initialState: State = {
  example: 0,
};

// Reducer
const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXAMPLE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_INITIAL_EXAMPLE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Action Creators
export const setExample = (example: number): ExampleAction_Payload => {
  return {
    type: SET_EXAMPLE,
    payload: { example },
  };
};

export const setInitialUserStatus = (): AbstractAction => {
  return {
    type: SET_INITIAL_EXAMPLE,
  };
};

export { reducer as example };
