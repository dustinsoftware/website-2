import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PageKeys } from "./types";

@customElement("my-bg")
export class MyBg extends LitElement {
  @property()
  openCardName!: PageKeys;

  render() {
    return html`
      <style>
        :host {
          --bg-1-opacity: ${this.openCardName === "about" ? "1" : "0"};
          --bg-3-opacity: ${this.openCardName === "contact-me" ? "1" : "0"};
        }
      </style>

      <div class="animated-bg bg-1"></div>
      <div class="animated-bg bg-2"></div>
      <div class="animated-bg bg-3"></div>
      <div class="animated-bg bg-4"></div>
    `;
  }

  static styles = css`
    @media print {
      :host {
        display: none;
      }
    }
    .animated-bg {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;

      transition: opacity 0.3s ease;
    }

    .bg-1 {
      background: -webkit-radial-gradient(top left, #1e91d6, #0072bb, #238a69);
      opacity: var(--bg-1-opacity, 0);
    }
    .bg-2 {
      background: -webkit-radial-gradient(top left, #084b83, #773241, #2a1e5c);
      opacity: var(--bg-2-opacity, 0);
    }
    .bg-3 {
      background: -webkit-radial-gradient(top left, #624ec1, #a24f03);
      opacity: var(--bg-3-opacity, 0);
    }
    .bg-4 {
      background: -webkit-radial-gradient(top left, #269cee, #54215b);
      opacity: var(--bg-4-opacity, 0);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-bg": MyBg;
  }
}
