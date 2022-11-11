import { LitElement } from "lit";
import { PageKeys } from "./types";
export declare class MyBg extends LitElement {
    openCardName: PageKeys;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "my-bg": MyBg;
    }
}
