export interface Quote {
  id: number;
  last: string;
  lowestAsk: string;
  highestBid: string;
  percentChange: string;
  baseVolume: string;
  quoteVolume: string;
  isFrozen: string;
  high24hr: string;
  low24hr: string;
}

export interface Quotes extends Quote {
  name: string;
}

export interface QuotesRequest {
  [name: string]: Quote;
}

export type State = {
  loading: boolean;
  error: boolean;
  quotes: Quotes[];
  renderQuotes: Quotes[];
};
