// @flow
import type { Show, Result } from './types';

export function fetchShows(idToken: string): Promise<Array<Show>> {
  return fetch('/api/shows', {
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
