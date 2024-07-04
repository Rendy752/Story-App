import { LitElement, html, css } from 'lit';
import storyContentStyles from '../../css/vendors-extensions/story-content.css';

class StoryContent extends LitElement {
  static properties = {
    stories: { type: Array },
  };

  constructor() {
    super();
    this.init();
  }

  async init() {
    await this._initialData();
  }

  async _initialData() {
    const fetchData = require('../../public/data/DATA');
    const data = await fetchData();
    if (!data) {
      throw new Error('Data is not found');
    }
    this._stories = data;
    this._populateStoriesDataToCard(this._stories);
  }

  _populateStoriesDataToCard(stories = null) {
    if (!(typeof stories === 'object')) {
      throw new Error(
        `Parameter stories should be an object. The value is ${stories}`,
      );
    }

    if (!Array.isArray(stories)) {
      throw new Error(
        `Parameter stories should be an array. The value is ${stories}`,
      );
    }

    if (stories.length <= 0) {
      this._templateEmptyCardContent();
    } else {
      stories.map((story) => {
        this.shadowRoot.querySelector('#cardItem').innerHTML +=
          this._templateCardContent(story);
      });
    }
  }

  _templateCardContent(story) {
    return `
        <story-item class="col" ontouchstart="this.classList.toggle('hover');" id="${story.id}" name="${story.name}" description="${story.description}" photourl="${story.photoUrl}" createdat="${story.createdAt}"></story-item>
    `;
  }

  _templateEmptyCardContent() {
    return html` <div class="empty-card">There is no story available</div> `;
  }

  static styles = css([`${storyContentStyles}`]);

  render() {
    return html`
      <div class="wrapper"><div class="cols" id="cardItem"></div></div>
    `;
  }
}

customElements.define('story-content', StoryContent);
