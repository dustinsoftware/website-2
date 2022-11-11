import { ReactiveController, ReactiveControllerHost } from "lit";
export declare class ScrollController implements ReactiveController {
    host: ReactiveControllerHost;
    scrollY: number | undefined;
    private _ticking;
    constructor(host: ReactiveControllerHost);
    hostConnected(): void;
    private _handleScroll;
    hostDisconnected(): void;
}
