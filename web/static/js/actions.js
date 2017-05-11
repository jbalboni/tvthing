// @flow
import type { Show } from './App';

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
