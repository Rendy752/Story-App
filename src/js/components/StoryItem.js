import { html } from 'lit';
import { LitWithoutShadowDom } from './base/LitWithoutShadowDom';

class StoryItem extends LitWithoutShadowDom {
  static properties = {
    id: { type: String, reflect: true },
    name: { type: String, reflect: true },
    description: { type: String, reflect: true },
    photoUrl: { type: String, reflect: true },
    createdAt: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('id')) {
      throw new Error(
        `Attribute "id" must be applied to the ${this.localName} element`,
      );
    }

    if (!this.hasAttribute('name')) {
      throw new Error(
        `Attribute "name" must be applied to the ${this.localName} element`,
      );
    }

    if (!this.hasAttribute('description')) {
      throw new Error(
        `Attribute "description" must be applied to the ${this.localName} element`,
      );
    }

    if (!this.hasAttribute('photoUrl')) {
      throw new Error(
        `Attribute "photoUrl" must be applied to the ${this.localName} element`,
      );
    }

    if (!this.hasAttribute('createdAt')) {
      throw new Error(
        `Attribute "createdAt" must be applied to the ${this.localName} element`,
      );
    }

    // createdAt: '2022-01-08T06:34:18.598Z'
  }

  render() {
    return html`
      <div class="container" id="${this.id}">
        <div class="front" style="background-image: url(${this.photoUrl})">
          <div class="inner">
            <p>
              ${new Date(this.createdAt).toLocaleDateString('en-EN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <span>${this.name}</span>
          </div>
        </div>
        <div class="back">
          <div class="inner">
            <p>${this.description}</p>
          </div>
        </div>
      </div>
    `;
  }
  //   render() {
  //     return html`
  //       <div class="col" ontouchstart="this.classList.toggle('hover');" id="${
  //         this.id
  //       }>
  //         <div class="container">
  //           <div class="front" style="url(${this.photoUrl})">
  //             <div class="inner">
  //               <p>${new Date(this.createdAt).toLocaleDateString('en-EN', {
  //                 year: 'numeric',
  //                 month: 'long',
  //                 day: 'numeric',
  //               })}</p>
  //               <span>${this.name}</span>
  //             </div>
  //           </div>
  //           <div class="back">
  //             <div class="inner">
  //               <p>
  //                 ${this.description}
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     `;
  //   }
}

customElements.define('story-item', StoryItem);
