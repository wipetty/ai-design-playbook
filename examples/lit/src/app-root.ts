// Lit app root with Spectrum Web Components and IMS
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/theme/scale-medium.js';

@customElement('app-root')
export class AppRoot extends LitElement {

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100vw;
      font-family: adobe-clean, sans-serif;
    }
  `;

  render() {
    return html`
      <sp-theme theme="spectrum" color="light" scale="medium">
        <div>
          Your app is now running. Describe the kind of application you want
          to make piece by piece to the agent.
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
