// @flow
import preact from 'preact';

import type { Result } from '../lib/types';

export default function SearchResults({ results }: { results: Array<Result> }) {
  return (
    <ul class="columns is-multiline">
      {results.map(result => (
        <li key={result.id} class="column is-one-third">
          <div class="card">
            <div class="card-image">
              <figure class="image is-16by9">
                <img src={result.artwork_208x117} alt="Promotional art" />
              </figure>
            </div>
            <div class="card-content">
              <h2 class="title">{result.title}</h2>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
