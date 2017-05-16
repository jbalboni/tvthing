import preact from 'preact';
import { addUser } from '../lib/auth';

export default class Login extends preact.Component {
  componentDidMount() {
    addUser(window.location.hash).then(result => {
      this.props.setUserInfo(result);
    });
  }
  render() {
    return <div>Logging you in...</div>;
  }
}
