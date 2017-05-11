// @flow
import preact from 'preact';
import Router, { route } from 'preact-router';

import { getUserInfo } from './auth';
import Main from './Main';
import Login from './Login';
import Nav from './Nav';

type User = {
  id: number,
  email: string
};

type Watchlist = {
  id: number,
  name: string
};

export type Show = {
  id: number,
  name: string
};

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
  render() {
    const { user, accessToken, idToken } = this.state;
    return (
      <div>
        <Nav accessToken={accessToken} user={user} />
        <Router>
          <Main
            path="/"
            isLoggedIn={this.state.user !== null}
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
