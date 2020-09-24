import { QuotesRequest } from "./types";

export const fetchQuotes = (): Promise<QuotesRequest> => {
  return fetch("https://poloniex.com/public?command=returnTicker")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        const error = new Error(data.error);
        throw error;
      }
      return data;
    })
    .catch(
      (e): Promise<Error> => {
        console.log("fetchQuotes error: ", e);
        return Promise.reject(e);
      }
    );
};
