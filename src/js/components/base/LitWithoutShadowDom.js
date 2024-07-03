import { LitElement } from 'lit';

export class LitWithoutShadowDom extends LitElement {
  createRenderRoot() {
    return this;
  }
}
