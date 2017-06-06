// @flow
import preact from 'preact';

type Props = {
  getSources: () => any,
  hideMenu: () => any
};

export default function ListChoice({ hideMenu, getSources }: Props) {
  return (
    <div class="result__list-choice">
      <h3 class="title is-3">
        Add to
      </h3>
      <button
        type="button"
        class="delete is-large result__delete"
        onClick={e => {
          e.stopPropagation();
          hideMenu();
        }}
      />
      <ul class="result__choices">
        <li>
          <button class="button is-link is-large result__choice">
            Want to watch
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              getSources();
            }}
            class="button is-link is-large result__choice">
            Currently watching
          </button>
        </li>
      </ul>
    </div>
  );
}
