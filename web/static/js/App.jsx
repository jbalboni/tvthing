// @flow
import preact from 'preact';
import './app.scss';
import Main from './Main';
import Nav from './Nav';

export default function App() {
	return (
    <div>
      <Nav/>
      <Main/>
    </div>
	);
}
