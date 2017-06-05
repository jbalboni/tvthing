// @flow
import preact from 'preact';
import classNames from 'classnames';
import { searchShows } from '../lib/actions';
import SearchResults from './SearchResults';
import type { Result, ListState } from '../lib/types';

type State = {
  term: string,
  list: Array<Result>,
  loading: boolean,
  showResults: boolean
};

export default class Search extends preact.Component {
  state: State;
  props: {
    addShow: (showId: number, state: ListState, source: ?string) => Promise<any>
  };
  constructor() {
    super();
    this.state = {
      term: '',
      list: [],
      loading: false,
      showResults: false
    };
  }
  search() {
    this.setState({ loading: true });
    searchShows(this.state.term).then(list => {
      this.setState({ list, loading: false, showResults: true });
    });
  }
  updateTerm(term: string) {
    this.setState({ term });
  }
  clearSearch() {
    this.setState({ list: [], term: '', showResults: false })
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
        {this.state.showResults &&
            <SearchResults results={this.state.list} clearSearch={() => this.clearSearch()} addShow={this.props.addShow} />}
      </div>
    );
  }
}
