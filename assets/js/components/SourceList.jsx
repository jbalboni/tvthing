// @flow
import preact from 'preact';

import type { Result, Source, ListState } from '../lib/types';

type Props = {
  sources: Array<Source>,
  useSource: (string) => any,
  hideMenu: () => any
};

export default function SourceList({ sources, hideMenu, useSource }: Props) {
  return (
    <div class="result__list-choice">
      <h3 class="title is-3">
        Add to
      </h3>
      <button
        type="button"
        class="delete is-large result__delete"
        onClick={e => {
          e.stopPropagation();
          hideMenu();
        }}
      />
      <ul class="result__choices">
        {sources.map(source => (
          <li>
            <button
              class="button is-link is-large result__choice"
              onClick={() => useSource(source.source)}>
              {source.display_name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
