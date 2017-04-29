// @flow
import preact from 'preact';

import type { Show } from './App';

export default function Main({ shows }: { shows: Array<Show> }) {
  return (
    <div>
      <div class="tabs is-centered">
        <ul>
          <li class="is-active"><a>Active</a></li>
          <li><a>Snoozed</a></li>
        </ul>
      </div>
      {shows.map(show => (
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {show.name}
            </p>
          </header>
        </div>
      ))}
    </div>
  );
}
