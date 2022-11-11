import { LitElement } from "lit";
import { PageKeys } from "./types";
export declare class MyIntro extends LitElement {
    openCardName: PageKeys;
    private scrollController;
    getScrollY: (clamp: number) => number;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "my-intro": MyIntro;
    }
}
