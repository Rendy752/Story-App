import { html } from 'lit';
import { LitWithoutShadowDom } from './base/LitWithoutShadowDom';

class CarouselContent extends LitWithoutShadowDom {
  render() {
    return html`
      <div class="bg-secondary text-center text-lg-start">
        <div class="text-center p-3 text-light">© 2024 Copyright: StoryApp</div>
      </div>
    `;
  }
}

customElements.define('carousel-content', CarouselContent);
