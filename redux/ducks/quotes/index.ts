import { Reducer } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { fetchQuotes } from "./fetchQuotes";
import { State, Quotes } from "./types";
import { limit } from "../../../constants";
import { AppState } from "../index";

// Actions
const SET_INITIAL_STATE = "quotes/SET_INITIAL_STATE";
const SET_LOADING = "quotes/SET_LOADING";
const SET_QUOTES = "quotes/SET_QUOTES";
const SET_RENDER_QUOTES = "quotes/SET_RENDER_QUOTES";
const GET_MORE_RENDER_QUOTES = "quotes/GET_MORE_RENDER_QUOTES";
const SET_ERROR = "quotes/SET_ERROR";

type ThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;

interface AbstractAction {
  type: string;
}

interface LoadingAction_Payload extends AbstractAction {
  payload: { loading: boolean };
}

interface SetQuotesAction_Payload extends AbstractAction {
  payload: { quotes: Quotes[] };
}

interface SetRenderQuotesAction_Payload extends AbstractAction {
  payload: { renderQuotes: Quotes[] };
}

interface SetErrorAction_Payload extends AbstractAction {
  payload: { error: boolean };
}

type Action =
  | LoadingAction_Payload
  | SetQuotesAction_Payload
  | SetRenderQuotesAction_Payload
  | SetErrorAction_Payload;

const initialState: State = {
  loading: false,
  error: false,
  quotes: [],
  renderQuotes: [],
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
    case SET_RENDER_QUOTES:
      return {
        ...state,
        ...action.payload,
      };
    case GET_MORE_RENDER_QUOTES:
      return {
        ...state,
        renderQuotes: [
          ...state.quotes.slice(0, state.renderQuotes.length + limit),
        ],
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

export const setRenderQuotes = (
  renderQuotes: Quotes[]
): SetRenderQuotesAction_Payload => {
  return {
    type: SET_RENDER_QUOTES,
    payload: { renderQuotes },
  };
};

export const setError = (error: boolean): SetErrorAction_Payload => {
  return {
    type: SET_QUOTES,
    payload: { error },
  };
};

export const getMoreRenderQuotes = (): AbstractAction => {
  return {
    type: GET_MORE_RENDER_QUOTES,
  };
};

export const getQuotes = (): ThunkResult<Promise<Quotes[] | Error>> => async (
  dispatch: ThunkDispatch<AppState, undefined, Action>,
  getState: () => AppState
) => {
  dispatch(setloading(true));
  return fetchQuotes()
    .then((data) => {
      const quotes = Object.keys(data).map((name) => ({ ...data[name], name }));
      const state = getState();
      dispatch(setQuotes(quotes));

      if (state.quotes.renderQuotes.length === 0) {
        dispatch(setRenderQuotes(quotes.slice(0, limit)));
      } else {
        dispatch(
          setRenderQuotes(quotes.slice(0, state.quotes.renderQuotes.length))
        );
      }

      dispatch(setError(false));
      dispatch(setloading(false));
      return Promise.resolve(quotes);
    })
    .catch(
      (e): Promise<Error> => {
        dispatch(setloading(false));
        dispatch(setError(true));
        return Promise.reject(e);
      }
    );
};

export { reducer as quotes };
