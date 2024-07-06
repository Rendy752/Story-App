import { html } from 'lit';
import { LitWithoutShadowDom } from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class DashboardHeader extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <h3 class="mb-3">${msg(`Dashboard`)}</h3>

      <div class="row mb-5 g-3">
        <carousel-content></carousel-content>
      </div>
    `;
  }
}

customElements.define('dashboard-header', DashboardHeader);
