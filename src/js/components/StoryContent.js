import { LitElement, html, css } from 'lit';
import storyContentStyles from '../../css/vendors-extensions/story-content.css';
import Stories from '../network/stories';
import Utils from '../utils/utils';
import Config from '../config/config';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class StoryContent extends LitElement {
  static properties = {
    stories: { type: Array },
    isUserSignedIn: { type: Boolean },
  };

  constructor() {
    super();
    this.init();
    updateWhenLocaleChanges(this);
  }

  async init() {
    await this._initialData();
  }

  async _initialData() {
    try {
      if (!this.isUserSignedIn) {
        return;
      }
      const userToken = Utils.getUserToken(Config.USER_TOKEN_KEY);
      this.isUserSignedIn = Boolean(userToken);

      if (this.isUserSignedIn) {
        const response = await Stories.getAll();
        const listStory = response.data.listStory;
        this._stories = listStory;
        this._populateStoriesDataToCard(this._stories);
      }
    } catch (error) {
      console.error(error);
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('isUserSignedIn')) {
      this._initialData();
    }
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

  _templateNotLoggedInCardContent() {
    return html`
      <div
        class="empty-card"
        style="text-align: center; font-size: 1.5rem; color: #6c757d;"
      >
        ${msg('Please login to see the stories')}
      </div>
    `;
  }

  _templateCardContent(story) {
    return `
        <story-item class="col" ontouchstart="this.classList.toggle('hover');" id="${story.id}" name="${story.name}" description="${story.description}" photourl="${story.photoUrl}" createdat="${story.createdAt}"></story-item>
    `;
  }

  _templateEmptyCardContent() {
    return html`
      <div
        class="empty-card"
        style="text-align: center; font-size: 1.5rem; color: #6c757d;"
      >
        ${msg('There is no story available')}
      </div>
    `;
  }

  static styles = css([`${storyContentStyles}`]);

  render() {
    if (!this.isUserSignedIn) {
      return this._templateNotLoggedInCardContent();
    } else {
      return html`
        <div class="wrapper"><div class="cols" id="cardItem"></div></div>
      `;
    }
  }
}

customElements.define('story-content', StoryContent);
