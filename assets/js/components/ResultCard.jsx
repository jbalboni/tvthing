// @flow
import preact from 'preact';
import { fetchSources } from '../lib/actions';

import type { Result, Source, ListState } from '../lib/types';
import { listStates } from '../lib/constants';

function ListChoice({ hideMenu, getSources }) {
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
        <li>
          <button class="button is-link is-large result__choice">
            Want to watch
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              getSources();
            }}
            class="button is-link is-large result__choice">
            Currently watching
          </button>
        </li>
      </ul>
    </div>
  );
}

function SourceList({ sources, hideMenu, useSource }) {
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

export default class ResultCard extends preact.Component {
  constructor() {
    super();
    this.state = {
      menu: 'none',
      sources: null
    };
  }
  props: {
    result: Result,
    addShow: (id: number, state: ListState, source: ?string) => Promise<any>
  };
  state: {
    menu: 'none' | 'list' | 'source',
    sources: ?Array<Source>
  };
  getSources() {
    fetchSources(this.props.result.id).then(sources =>
      this.setState({ menu: 'source', sources }));
  }
  render() {
    const { result, addShow } = this.props;
    const { menu, sources } = this.state;

    return (
      <div
        role="button"
        aria-label={`Add ${result.title} to watchlist`}
        class="card"
        onClick={() => this.setState({ menu: 'list' })}>
        <div class="card-image">
          <figure class="image is-16by9">
            <img src={result.artwork_208x117} alt="Promotional art" />
          </figure>
        </div>
        <div class="card-content">
          <h2 class="title">{result.title}</h2>
        </div>
        {menu === 'list' &&
          <ListChoice
            getSources={() => this.getSources()}
            hideMenu={() => this.setState({ menu: 'none' })}
          />}
        {menu === 'source' &&
          sources != null &&
          <SourceList
            sources={sources}
            useSource={source =>
              this.props.addShow(result.id, listStates.WANT_TO_WATCH, source)}
            hideMenu={() => this.setState({ menu: 'none' })}
          />}
      </div>
    );
  }
}
