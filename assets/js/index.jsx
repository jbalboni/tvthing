// @flow
import preact from 'preact';
import App from './components/App';
import '../css/app.scss';

preact.render(
  <App
    accessToken={localStorage.getItem('accessToken')}
    idToken={localStorage.getItem('idToken')}
  />,
  document.getElementById('appRoot')
);
