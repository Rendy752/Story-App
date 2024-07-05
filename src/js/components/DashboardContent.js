import { html } from 'lit';
import { LitWithoutShadowDom } from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class DashboardContent extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="container py-5">
        <h3 class="mb-3">${msg(`Dashboard`)}</h3>

        <div class="row mb-5 g-3">
          <carousel-content></carousel-content>
        </div>

        <div>
          <div>
            <h3>Explore Stories</h3>
            <h5 class="text-muted">
              ${msg(`Keep up with the latest stories.`)}
            </h5>
          </div>
          <div class="row mt-3">
            <div class="col" id="storiesContent">
              <story-content></story-content>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('dashboard-content', DashboardContent);
