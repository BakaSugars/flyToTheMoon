import { getId } from "../utils/util";
import { Scene } from "../game/scene";

export class Renderer {
    private _frameId: number;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _scene: Scene;
    constructor(canvas: HTMLCanvasElement, scene: Scene) {
        this._canvas = canvas;
        this._scene = scene;
        this._ctx = canvas.getContext('2d');
    }

    public framePaint() {
        if (!this._frameId) {
            this._frameId = getId();
            window.requestAnimationFrame(() => {
                this._frameId = undefined;
                this.render();
            });
        }
    }

    public render() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.fillStyle = 'black';
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._scene.update();
        this._scene.iconManager.render(this._ctx, this._canvas);
        console.log('render');
    }
}