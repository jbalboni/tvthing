import preact from 'preact';
import { login } from './auth';

export default function Nav() {
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
          <button class="button is-link nav-item" onClick={login}>
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}
