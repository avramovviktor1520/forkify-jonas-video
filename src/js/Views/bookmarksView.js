import {PreviewView} from './previewView';
import icons from '../../img/icons.svg';

class BookmarksView extends PreviewView {
    _message = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
      No bookmarks yet. Find a nice recipe and bookmark it :)
    </p>
  </div>`;
    constructor() {
        super('bookmarks');
    }
}


export default new BookmarksView();