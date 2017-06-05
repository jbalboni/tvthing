// @flow

export type User = {
  id: number,
  email: string
};

export type Watchlist = {
  id: number,
  name: string
};

export type Show = {
  id: number,
  title: string,
  artwork_208x117: string
};

export type Result = {
  title: string,
  id: number,
  artwork_208x117: string
};

export type Source = {
  display_name: number,
  source: string
};

export type ListState = 1 | 2 | 3 | 4;
