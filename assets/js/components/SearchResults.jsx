// @flow
import preact from 'preact';
import ResultCard from './ResultCard';

import type { Result } from '../lib/types';

type Props = {
  results: Array<Result>,
  addShow: Function,
  clearSearch: () => any
};

export default function SearchResults(
  { results, addShow, clearSearch }: Props
) {
  return (
    <div>
      <div class="level">
        <div class="level-left"><h1 class="title">Search results</h1></div>
        <div class="level-right">
          <button
            type="button"
            class="delete is-large"
            onClick={e => {
              e.stopPropagation();
              clearSearch();
            }}
          />
        </div>
      </div>
      <ul class="columns is-multiline">
        {results.map(result => (
          <li key={result.id} class="column is-one-third">
            <ResultCard result={result} addShow={addShow} />
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
