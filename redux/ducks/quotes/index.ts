import { Reducer, Dispatch } from "redux";

import { fetchQuotes } from "./fetchQuotes";
import { State, Quotes } from "./types";

// Actions
const SET_INITIAL_STATE = "quotes/SET_INITIAL_STATE";
const SET_LOADING = "quotes/SET_LOADING";
const SET_QUOTES = "quotes/SET_QUOTES";
const SET_ERROR = "quotes/SET_ERROR";

interface AbstractAction {
  type: string;
}

interface LoadingAction_Payload extends AbstractAction {
  payload: { loading: boolean };
}

interface SetQuotesAction_Payload extends AbstractAction {
  payload: { quotes: Quotes[] };
}

interface SetErrorAction_Payload extends AbstractAction {
  payload: { error: boolean };
}

type Action =
  | LoadingAction_Payload
  | LoadingAction_Payload
  | SetErrorAction_Payload;

const initialState: State = {
  loading: false,
  error: false,
  quotes: [],
};

// Reducer
const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return {
        ...initialState,
      };

    case SET_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    case SET_QUOTES:
      return {
        ...state,
        ...action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// Action Creators
export const setInitialUserStatus = (): AbstractAction => {
  return {
    type: SET_INITIAL_STATE,
  };
};

export const setloading = (loading: boolean): LoadingAction_Payload => {
  return {
    type: SET_LOADING,
    payload: { loading },
  };
};

export const setQuotes = (quotes: Quotes[]): SetQuotesAction_Payload => {
  return {
    type: SET_QUOTES,
    payload: { quotes },
  };
};

export const setError = (error: boolean): SetErrorAction_Payload => {
  return {
    type: SET_QUOTES,
    payload: { error },
  };
};

export const getQuotes = () => async (
  dispatch: Dispatch
): Promise<Quotes[]> => {
  dispatch(setloading(true));
  return fetchQuotes()
    .then((data) => {
      const quotes = Object.keys(data).map((name) => ({ ...data[name], name }));
      dispatch(setQuotes(quotes));
      dispatch(setError(false));
      dispatch(setloading(false));
      return quotes;
    })
    .catch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (e): Promise<any> => {
        dispatch(setloading(false));
        dispatch(setError(true));

        return Promise.reject(e);
      }
    );
};

export { reducer as quotes };
