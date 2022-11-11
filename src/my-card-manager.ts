import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "/src/my-card";
import "/src/my-bg";
import "/src/my-intro";
import "/src/my-footer";
import "/src/index.css";
import { PageKeys } from "./types";

@customElement("my-card-manager")
export class MyCardManager extends LitElement {
  async firstUpdated() {
    await new Promise((resolve) => setTimeout(resolve, 1));
    window.addEventListener("click", this.closeOpenCards);
  }

  closeOpenCards = (e: Event) => {
    e.preventDefault();
    this.handleOpen({ detail: "" });
  };

  disconnectedCallback(): void {
    window.removeEventListener("click", this.closeOpenCards);
  }

  @property()
  private _openCardName: PageKeys = "";

  render() {
    return html`
      <my-intro></my-intro>
      <my-bg openCardName=${this._openCardName}></my-bg>

      <my-card
        cardName="about"
        openCardName=${this._openCardName}
        @handle-open=${this.handleOpen}
      >
        <div slot="title">What is this place?</div>
        <div slot="content">A playground for web components and CSS.</div>
      </my-card>
      <my-card
        cardName="contact-me"
        openCardName=${this._openCardName}
        @handle-open=${this.handleOpen}
      >
        <div slot="title">Contact Me</div>
        <div slot="content">
          <a href="https://twitter.com/dustinsoftware"
            >https://twitter.com/dustinsoftware</a
          >
          <div>
            <a rel="me" href="https://infosec.exchange/@masters"
              >@masters@infosec.exchange</a
            >
          </div>
        </div>
      </my-card>
      <my-footer></my-footer>
    `;
  }

  handleOpen(event: { detail: PageKeys }) {
    if (this._openCardName === event.detail) {
      return;
    }
    this._openCardName = event.detail;
  }

  static styles = css`
    :host {
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
      width: 100%;
    }

    a {
      font-weight: 500;
      color: #eee;
      text-decoration: inherit;
      transition: 0.4s all;
    }
    a:hover {
      background: linear-gradient(
        90deg,
        rgba(255, 0, 0, 1) 0%,
        rgba(255, 154, 0, 1) 10%,
        rgba(208, 222, 33, 1) 20%,
        rgba(79, 220, 74, 1) 30%,
        rgba(63, 218, 216, 1) 40%,
        rgba(47, 201, 226, 1) 50%,
        rgba(28, 127, 238, 1) 60%,
        rgba(95, 21, 242, 1) 70%,
        rgba(186, 12, 248, 1) 80%,
        rgba(251, 7, 217, 1) 90%,
        rgba(255, 0, 0, 1) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .contact-me-svg {
      fill: #ddd;
    }

    .print {
      border: 0;
      background: none;
      font-size: 20px;
      margin: 8px 0;
      padding: 0;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.87);
      font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    }
    .print:hover {
      color: #aedcfa;
    }

    @media print {
      .contact-me-svg {
        fill: #111;
      }
      .print {
        display: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-card-manager": MyCardManager;
  }
}
