export type Quote = {
    id: number;
    quote: string;
    author: string;
    total: number;
}

export type QuotesResponse = {
    quotes: Quote[]
    total: number,
    skip: number,
    limit: number
  }
  