import { LitElement, css, html, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PageKeys } from "./types";

@customElement("my-card")
export class MyCard extends LitElement {
  @property()
  openCardName!: PageKeys;

  @property()
  cardName!: string;

  @property()
  measuredHeight: number | undefined;

  @property()
  private _scrollTop: number | undefined;

  firstUpdated() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  disconnectedCallback(): void {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.measuredHeight =
      this.renderRoot.querySelector(".content")?.scrollHeight;
  };

  updated(previous: PropertyValues) {
    if (
      Array.from(previous.keys()).includes("openCardName") &&
      this.cardName === this.openCardName
    ) {
      setTimeout(
        () => window.scrollTo({ top: this._scrollTop, behavior: "smooth" }),
        200
      );
    }

    if (Array.from(previous.keys()).includes("measuredHeight")) {
      setTimeout(() => {
        this._scrollTop =
          (this.shadowRoot?.querySelector(".content")?.getBoundingClientRect()
            .y! + window.scrollY)! * 0.85;
      }, 1);
    }
  }

  handleOpen(event: Event) {
    if (
      event instanceof KeyboardEvent &&
      event.key !== "Enter" &&
      event.key !== " "
    ) {
      return;
    }

    event.stopPropagation();
    const customEvent = new CustomEvent<PageKeys>("handle-open", {
      bubbles: true,
      detail: this.cardName as PageKeys,
    });
    this.dispatchEvent(customEvent);
  }

  render() {
    return html`
      <style>
        :host {
          --clientheight: ${!this.measuredHeight
            ? ""
            : this.openCardName === this.cardName
            ? `${this.measuredHeight}px`
            : "0px"};
        }
      </style>
      <div
        role="button"
        tabindex="0"
        class="container ${this.openCardName === this.cardName ? "open" : ""}"
        @click=${this.handleOpen}
        @keydown=${this.handleOpen}
      >
        <div class="title"><slot name="title"></slot></div>
        <div class="content"><slot name="content"></slot></div>
      </div>
    `;
  }

  static styles = css`
    :host {
      margin: 0 auto;
      text-align: center;
      font-size: 20px;
      display: block;
      max-width: 800px;
    }

    .container:hover:not(.open) {
      background: rgba(255, 255, 255, 0.4);
    }

    .title {
      font-size: 48px;
      line-height: 1.4em;
      margin: 16px;
    }

    .content {
      opacity: 0;
      transition: all 0.4s ease;
    }

    .container.open .content {
      opacity: 1;
    }

    .container {
      cursor: pointer;
      transition: all 0.2s ease-out;

      background: rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      overflow: hidden;

      transform: scale(0.7);

      padding: 16px;
    }

    .content {
      height: var(--clientheight, "");
      text-align: left;

      line-height: 1.4em;
    }

    .container.open {
      transform: initial;
    }

    .content ::slotted(svg) {
      stroke: #ddd;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-card": MyCard;
  }
}
