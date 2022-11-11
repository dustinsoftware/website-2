import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("my-footer")
export class MyFooter extends LitElement {
  render() {
    return html` <div class="height-filler"></div>
      😎`;
  }

  static styles = css`
    .height-filler {
      height: 100%;
      width: 100%;
    }

    @media print {
      :host {
        display: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-footer": MyFooter;
  }
}
