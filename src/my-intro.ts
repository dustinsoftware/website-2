import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PageKeys } from "./types";
import { ScrollController } from "./reactive/scroll";

@customElement("my-intro")
export class MyIntro extends LitElement {
  @property()
  openCardName!: PageKeys;

  private scrollController = new ScrollController(this);

  getScrollY = (clamp: number) =>
    Math.max(0, (this.scrollController.scrollY ?? 0) - clamp);

  render() {
    return html`
      <style>
        :host {
          --blur: ${(this.getScrollY(200) ?? 0) / (window.outerHeight * 0.1)}px;

          --opacity: ${1 - (this.getScrollY(200) ?? 0) / window.outerHeight};

          --scale: ${Math.max(
            0,
            1 - (this.getScrollY(200) ?? 0) / (window.outerHeight * 5)
          )};

          --title-2-opacity: ${(this.getScrollY(0) ?? 0) / 200};
        }
      </style>

      <div class="height-filler"></div>
      <div class="outer">
        <div class="container">
          <div class="title-container">
            <div class="title">hello!</div>
            <div class="title-2">i'm dustin masters</div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .height-filler {
      height: 90vh;
      width: 100%;
    }
    .outer {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    .container {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: blur(var(--blur));
      opacity: var(--opacity);
      transform: scale(var(--scale));
    }

    .title-container {
      line-height: 5em;
    }

    .title {
      font-size: 72px;
      display: block;
    }

    .title-2 {
      font-size: 72px;
      display: block;
      opacity: var(--title-2-opacity, 0);
    }
    .print-warning {
      display: none;
    }

    @media print {
      .height-filler {
        display: none;
      }
      .outer {
        position: relative;
        height: initial;
        top: initial;
        left: initial;
        width: initial;
      }
      .container {
        opacity: initial;
        display: block;
        filter: initial;
        opacity: initial;
        transform: initial;
      }
      .title-2 {
        opacity: initial;
      }
      .print-warning {
        display: block;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-intro": MyIntro;
  }
}
