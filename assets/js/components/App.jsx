// @flow
import preact from 'preact';
import Router, { route } from 'preact-router';

import Main from './Main';
import Login from './Login';
import Nav from './Nav';
import Search from './Search';

import { getUserInfo } from '../lib/auth';

import type { Watchlist, User, ListState } from '../lib/types';

import { addShow } from '../lib/actions';

type Props = {
  accessToken: ?string,
  idToken: ?string
};

export default class App extends preact.Component {
  state: {
    user: ?User,
    watchlist: ?Watchlist,
    accessToken: ?string,
    idToken: ?string
  };
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      user: null,
      accessToken: props.accessToken,
      idToken: props.idToken,
      watchlist: null
    };
  }
  componentDidMount() {
    if (this.state.idToken != null) {
      getUserInfo(this.state.idToken).then(({ user, watchlist }) => {
        this.setState({ user, watchlist });
      });
    }
  }
  setUserInfo(
    {
      user,
      watchlist,
      accessToken,
      idToken
    }: {
      user: User,
      watchlist: Watchlist,
      accessToken: string,
      idToken: string
    }
  ) {
    this.setState({ user, watchlist, accessToken, idToken }, () => route('/'));
  }
  addShow(showId: number, state: ListState, source: ?string): Promise<any> {
    const { watchlist, idToken } = this.state;
    if (watchlist && idToken) {
      return addShow(idToken, watchlist.id, showId, state, source);
    }

    return Promise.reject();
  }
  render() {
    const { user, accessToken, idToken, watchlist } = this.state;
    const isLoggedIn = this.state.user !== null;
    return (
      <div>
        <Nav accessToken={accessToken} isLoggedIn={isLoggedIn} />
        <Search
          addShow={(showId, state, source) =>
            this.addShow(showId, state, source)}
        />
        <Router>
          <Main
            path="/"
            watchlist={watchlist}
            isLoggedIn={isLoggedIn}
            idToken={idToken}
          />
          <Login
            path="/login"
            setUserInfo={(...args) => this.setUserInfo(...args)}
          />
        </Router>
      </div>
    );
  }
}
