// @flow
import preact from 'preact';
import flyd from 'flyd';

import Main from './Main';
import Nav from './Nav';

export type Show = { name: string };
export type State = { shows: Array<Show> };

const stream = flyd.stream({
  shows: []
});

export default class App extends preact.Component {
  state: State;
  constructor() {
    super();
    this.state = stream();
    flyd.on(newState => this.setState(newState), stream);
  }
  componentDidMount() {
    const promise = fetch('/api/watchlists/1/shows')
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }

        return Promise.reject(resp.status);
      })
      .then(shows => {
        return {
          shows
        };
      });
    stream(promise);
  }
  render() {
    return (
      <div>
        <Nav />
        <Main shows={this.state.shows} />
      </div>
    );
  }
}
