import { EventEmitter } from "events";
import Point from "../utils/point";

interface ICollisionOpt {
    maxx: number;
    maxy: number;
    minx: number;
    miny: number;
}

export class CollsionBox extends EventEmitter {
    private _opt: ICollisionOpt;
    constructor(opt: ICollisionOpt) {
        super();
        this._opt = opt;
    }

    public get center() {
        const x = (this._opt.maxx + this._opt.minx) / 2;
        const y = (this._opt.maxy + this._opt.miny) / 2;
        return new Point(x, y);
    }

    public get width() {
        return this._opt.maxx - this._opt.minx;
    }

    public get height() {
        return this._opt.maxy - this._opt.miny;
    }
}