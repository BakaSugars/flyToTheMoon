import { BaseObj } from "../utils/baseObj";

interface IconOpt {
    width?: number;
    height?: number;
    angle?: number;
    image: HTMLImageElement;
    canvasX: number;
    canvasY: number;
}
export class Icon extends BaseObj {
    private _opt: IconOpt;
    constructor (opt: IconOpt) {
        super();
        this._opt = opt;
    }

    public get width() {
        return this._opt.width || this.image.width;
    }

    public get height() {
        return this._opt.height || this.image.height;
    }

    public get angle() {
        return this._opt.angle || 0;
    }

    public set angle(angle: number) {
        this._opt.angle = angle;
    }

    public get canvasX() {
        return this._opt.canvasX;
    }

    public set canvasX(x: number) {
        this._opt.canvasX = x;
    }

    public set canvasY(y: number) {
        this._opt.canvasY = y;
    }

    public get canvasY() {
        return this._opt.canvasY;
    }

    public get image() {
        return this._opt.image;
    }

    public render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        const w = this.width;
        const h = this.height;
        const x = this.canvasX;
        const y = this.canvasY;
        if (x + w < 0) {
            return;
        }
        if (y + h < 0) {
            return;
        }
        if (x - w > canvas.width) {
            return;
        }
        if (y - h > canvas.height) {
            return;
        }
        const angle = this.angle
        const r = angle * Math.PI / 180;
        const cos = Math.cos(-r);
        const sin = Math.sin(-r);
        const rotatex = x * cos - y * sin;
        const rotatey = y * cos + x * sin;
        ctx.rotate(r);
        ctx.drawImage(this.image, rotatex - w / 2, rotatey - h / 2, w, h);
        ctx.rotate(-r);
    }
}