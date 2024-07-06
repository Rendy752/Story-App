import { html } from 'lit';
import { LitWithoutShadowDom } from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class AddStoryHeader extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html` <h3 class="mb-3">${msg('Add Your Story')}</h3> `;
  }
}

customElements.define('add-story-header', AddStoryHeader);
