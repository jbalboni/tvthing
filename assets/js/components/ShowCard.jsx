// @flow
import preact from 'preact';
import type { Show } from '../lib/types';

type Props = {
  show: Show,
  children?: any
};

export default function ShowCard({ show, children }: Props) {
  return (
    <div class="card">
      <div class="card-image">
        <figure class="image is-16by9">
          <img src={show.artwork_448x252} alt="Promotional art" />
        </figure>
      </div>
      <div class="card-content">
        <h2 class="title">{show.title}</h2>
        {children}
      </div>
    </div>
  );
}

ShowCard.defaultProps = {
  children: null
};
