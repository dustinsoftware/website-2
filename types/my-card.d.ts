import { LitElement, PropertyValues } from "lit";
import { PageKeys } from "./types";
export declare class MyCard extends LitElement {
    openCardName: PageKeys;
    cardName: string;
    measuredHeight: number | undefined;
    private _scrollTop;
    firstUpdated(): void;
    disconnectedCallback(): void;
    handleResize: () => void;
    updated(previous: PropertyValues): void;
    handleOpen(event: Event): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "my-card": MyCard;
    }
}
