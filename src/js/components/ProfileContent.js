import { html } from 'lit';
import { LitWithoutShadowDom } from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class ProfileContent extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="container py-5">
        <h1 class="mb-4 text-center">Story App Company Profile</h1>
        <div class="jumbotron">
          <h2>About Us</h2>
          <p class="lead">
            Story App is a platform dedicated to bringing storytellers and
            readers together. We believe in the power of stories to connect
            people, inspire change, and bring joy.
          </p>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-4">
              <div class="card-body">
                <h3 class="card-title">Our Mission</h3>
                <p class="card-text">
                  To provide an accessible platform for storytellers to share
                  their work and for readers to discover new stories that
                  inspire, entertain, and inform.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-4">
              <div class="card-body">
                <h3 class="card-title">Our Vision</h3>
                <p class="card-text">
                  To be the world's leading storytelling platform, fostering a
                  global community of storytellers and readers.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-body">
                <h4 class="card-title">Our Values</h4>
                <ul>
                  <li>Creativity and Innovation</li>
                  <li>Community and Connection</li>
                  <li>Diversity and Inclusion</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-body">
                <h4 class="card-title">Contact Us</h4>
                <p class="card-text">Email: contact@storyapp.com</p>
                <p class="card-text">Phone: +123 456 7890</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-body">
                <h4 class="card-title">Follow Us</h4>
                <p class="card-text">Twitter: @StoryApp</p>
                <p class="card-text">Instagram: @StoryAppOfficial</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('profile-content', ProfileContent);
