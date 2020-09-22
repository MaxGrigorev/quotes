import { QuotesRequest } from "./types";

export const fetchQuotes = (): Promise<QuotesRequest> => {
  return fetch("https://poloniex.com/public?command=returnTicker")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch(
      (e): Promise<any> => {
        return Promise.reject(e);
      }
    );
};
