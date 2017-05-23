// @flow
import type { Source, Show, Result, ListState } from './types';

export function fetchShows(watchlistId : number, idToken: string): Promise<Array<Show>> {
  return fetch(`/api/watchlists/${watchlistId}/shows`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    }

    return Promise.reject(resp.statusText);
  });
}

export function searchShows(term: string): Promise<Array<Result>> {
  return fetch(`/api/public/search?query=${term}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }

      return Promise.reject(resp.statusText);
    })
    .then(response => {
      return response.results;
    });
}

export function fetchSources(id: number): Promise<Array<Source>> {
  return fetch(`/api/public/shows/${id}`).then(resp => {
    if (resp.ok) {
      return resp.json();
    }

    return Promise.reject(resp.statusText);
  });
}

export function addShow(
  idToken: string,
  watchlistId: number,
  showId: number,
  state: ListState,
  source: ?string
): Promise<any> {
  return fetch(`/api/watchlists/${watchlistId}/shows`, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: watchlistId,
      guidebox_id: showId,
      state,
      source
    })
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    }

    return Promise.reject(resp.statusText);
  });
}
