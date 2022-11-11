import { ReactiveController, ReactiveControllerHost } from "lit";

export class ScrollController implements ReactiveController {
  host: ReactiveControllerHost;
  scrollY: number | undefined;
  private _ticking: boolean;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
    this._ticking = false;
  }

  hostConnected(): void {
    document.addEventListener("scroll", this._handleScroll);
  }

  private _handleScroll = () => {
    this.scrollY = window.scrollY;
    if (!this._ticking) {
      this._ticking = true;
      window.requestAnimationFrame(() => {
        this._ticking = false;
        this.host?.requestUpdate();
      });
    }
  };

  hostDisconnected(): void {
    document.removeEventListener("scroll", this._handleScroll);
  }
}
