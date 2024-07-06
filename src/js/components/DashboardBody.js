import { html } from 'lit';
import { LitWithoutShadowDom } from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class DashboardBody extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h3>Explore Stories</h3>
          <h5 class="text-muted">${msg(`Keep up with the latest stories.`)}</h5>
        </div>
        <button
          class="btn-custom"
          onclick="window.location.href='/story/add.html'"
        >
          Add Story
        </button>
      </div>
      <div class="row mt-3">
        <div class="col" id="storiesContent">
          <story-content></story-content>
        </div>
      </div>
    `;
  }
}

customElements.define('dashboard-body', DashboardBody);
