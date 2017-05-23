// @flow
import preact from 'preact';
import ResultCard from './ResultCard';

import type { Result } from '../lib/types';

export default function SearchResults(
  { results, addShow }: { results: Array<Result>, addShow: Function }
) {
  return (
    <ul class="columns is-multiline">
      {results.map(result => (
        <li key={result.id} class="column is-one-third">
          <ResultCard result={result} addShow={addShow} />
        </li>
      ))}
    </ul>
  );
}
