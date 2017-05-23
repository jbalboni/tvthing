// @flow
import preact from 'preact';

import { fetchShows } from '../lib/actions';
import type { Show, Watchlist } from '../lib/types';

type Props = {
  isLoggedIn: boolean,
  idToken: ?string,
  watchlist: ?Watchlist
};

export default class Main extends preact.Component {
  constructor() {
    super();
    this.state = {
      shows: []
    };
  }
  state: {
    shows: Array<Show>
  };
  props: Props;
  componentDidMount() {
    const { isLoggedIn, idToken, watchlist } = this.props;
    if (isLoggedIn && idToken && watchlist) {
      fetchShows(watchlist.id, idToken).then(shows => {
        this.setState({ shows });
      });
    }
  }
  componentWillReceiveProps({ watchlist, isLoggedIn, idToken }: Props) {
    if (!this.props.isLoggedIn && isLoggedIn && idToken && watchlist) {
      fetchShows(watchlist.id, idToken).then(shows => {
        this.setState({ shows });
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.shows.map(show => (
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
}
