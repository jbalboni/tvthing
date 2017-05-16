// @flow
import preact from 'preact';
import classNames from 'classnames';
import { searchShows } from '../lib/actions';
import SearchResults from './SearchResults';
import type { Result } from '../lib/types';

type State = {
  term: string,
  list: Array<Result>,
  loading: boolean
};

export default class Search extends preact.Component {
  state: State;
  constructor() {
    super();
    this.state = {
      term: '',
      list: [],
      loading: false
    };
  }
  search() {
    this.setState({ loading: true });
    searchShows(this.state.term).then(list => {
      this.setState({ list, loading: false });
    });
  }
  updateTerm(term: string) {
    this.setState({ term });
  }
  render() {
    const buttonClasses = classNames('button', 'is-info', 'is-medium', {
      'is-loading': this.state.loading
    });
    return (
      <div class="container search__container">
        <div class="search__field-container">
          <div class="search__field">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input
                  class="input is-medium"
                  type="text"
                  placeholder="Find a show"
                  onKeyUp={({ key }) => key === 'Enter' ? this.search() : null}
                  onChange={e => this.updateTerm(e.target.value)}
                />
              </p>
              <p class="control">
                <button class={buttonClasses} onClick={() => this.search()}>
                  Search
                </button>
              </p>
            </div>
          </div>
        </div>
        <SearchResults results={this.state.list} />
      </div>
    );
  }
}
