// @flow
import preact from 'preact';
import { fetchSources } from '../lib/actions';

import type { Result, Source, ListState } from '../lib/types';
import { listStates } from '../lib/constants';
import ListChoice from './ListChoice';
import SourceList from './SourceList';
import ShowCard from './ShowCard';

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
        onClick={() => this.setState({ menu: 'list' })}>
        <ShowCard show={result}>
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
        </ShowCard>
      </div>
    );
  }
}
