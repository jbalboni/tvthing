import preact from 'preact';

export default function Nav() {
  return (
    <nav class="nav">
      <div class="nav-left">
        <a class="nav-item">
          TV Thing
        </a>
      </div>
      <div class="nav-right nav-menu">
        <a class="nav-item">
          Sign in
        </a>
      </div>
    </nav>
  );
}
