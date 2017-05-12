// @flow
import preact from 'preact';
import { login, logout, getPicture } from '../lib/auth';

type Props = {
  accessToken: ?string,
  isLoggedIn: boolean
};

type State = {
  picture: ?string
};

export default class Nav extends preact.Component {
  constructor() {
    super();
    this.state = { picture: null };
  }
  props: Props;
  state: State;
  componentWillMount() {
    if (this.props.isLoggedIn && this.props.accessToken != null) {
      getPicture(this.props.accessToken).then(picture => {
        this.setState({ picture });
      });
    }
  }
  componentWillReceiveProps(props: Props) {
    if (
      props.isLoggedIn &&
      !this.props.isLoggedIn &&
      this.props.accessToken != null
    ) {
      getPicture(this.props.accessToken).then(picture => {
        this.setState({ picture });
      });
    }
  }
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const picture = this.state.picture;
    return (
      <nav class="nav has-shadow">
        <div class="container">
          <div class="nav-left">
            <a class="nav-item">
              <img src="images/icon_144.png" alt="TV set logo" />
            </a>
            <a class="nav-item is-tab">
              Active
            </a>
            <a class="nav-item is-tab">
              Snoozed
            </a>
          </div>
          <span class="nav-toggle">
            <span />
            <span />
            <span />
          </span>
          <div class="nav-right nav-menu">
            {!isLoggedIn &&
              <button class="button is-link nav-item" onClick={login}>
                Sign in
              </button>}
            {isLoggedIn &&
              <span class="nav-item">
                {picture != null && <img class="profile__img" src={picture} alt="Profile" />}
                <button class="button is-link nav__auth-link" onClick={logout}>
                  Sign out
                </button>
              </span>}
          </div>
        </div>
      </nav>
    );
  }
}
