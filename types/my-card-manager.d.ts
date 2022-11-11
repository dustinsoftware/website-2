import { LitElement } from "lit";
import "/src/my-card";
import "/src/my-bg";
import "/src/my-intro";
import "/src/my-footer";
import "/src/index.css";
import { PageKeys } from "./types";
export declare class MyCardManager extends LitElement {
    firstUpdated(): Promise<void>;
    closeOpenCards: (e: Event) => void;
    disconnectedCallback(): void;
    private _openCardName;
    render(): import("lit-html").TemplateResult<1>;
    handleOpen(event: {
        detail: PageKeys;
    }): void;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "my-card-manager": MyCardManager;
    }
}
