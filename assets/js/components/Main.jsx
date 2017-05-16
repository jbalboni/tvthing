// @flow
import preact from 'preact';

import { fetchShows } from '../lib/actions';
import type { Show } from '../lib/types';

type Props = {
  isLoggedIn: boolean,
  idToken: ?string
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
    if (this.props.isLoggedIn && this.props.idToken) {
      fetchShows(this.props.idToken).then(shows => {
        this.setState({ shows });
      });
    }
  }
  componentWillReceiveProps({ isLoggedIn, idToken }: Props) {
    if (!this.props.isLoggedIn && isLoggedIn && idToken) {
      fetchShows(idToken).then(shows => {
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
