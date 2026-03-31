// Lit app root with Spectrum Web Components and IMS
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/button/sp-button.js';
import { IMS } from './utils/IMS';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state()
  private authenticated = false;

  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: adobe-clean, sans-serif;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    await IMS.ready;
    this.authenticated = IMS.isAuthenticated;

    // Listen for IMS state changes
    this.updateAuth = this.updateAuth.bind(this);
    window.addEventListener('imsReady', this.updateAuth);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('imsReady', this.updateAuth);
  }

  protected updated(changedProperties: Map<string, unknown>) {
    // Use this lifecycle method for auth-dependent initialization
    // e.g., router initialization that requires authentication
    if (changedProperties.has('authenticated') && this.authenticated) {
      // Initialize router or any auth-dependent logic here
    }
  }

  private updateAuth() {
    this.authenticated = IMS.isAuthenticated;
  }

  private handleSignIn() {
    IMS.signIn();
  }

  private handleSignOut() {
    IMS.logout();
  }

  render() {
    return html`
      <sp-theme theme="spectrum" color="light" scale="medium">
        <div class="container">
          <h1>Protopack App</h1>

          ${this.authenticated
            ? html`
                <p>Welcome! You're signed in with Adobe IMS.</p>
                <sp-button variant="primary" @click=${this.handleSignOut}>
                  Sign out
                </sp-button>
              `
            : html`
                <p>Please sign in to continue.</p>
                <sp-button variant="accent" @click=${this.handleSignIn}>
                  Sign in with Adobe
                </sp-button>
              `}
        </div>
      </sp-theme>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
