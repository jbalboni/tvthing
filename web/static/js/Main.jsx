import preact from 'preact';

const test = f => f;
export default function Main() {
  return (
		<div class="tabs is-centered">
			<ul>
				<li class="is-active"><a>Active</a></li>
				<li><a>Snoozed</a></li>
			</ul>
		</div>
  );
}
