import Point from "../utils/point";
import { Icon } from "../render/icon";
import { BaseElement } from "./baseElement";

interface ICameraOption {
    center: Point;
    angle: number;
    height: number;
    width: number;
}

export class Camera {
    private _center: Point;
    private _angle: number;
    private _height: number;
    private _width: number;
    constructor(opt: ICameraOption) {
        this._center = opt.center;
        this._angle = opt.angle;
        this._height = opt.height;
        this._width = opt.width;
    }

    public get height() {
        return this._height;
    }

    public get width() {
        return this._width;
    }

    public get center() {
        return this._center;
    }

    public set center(c: Point) {
        this._center = c;
    }

    public get angle() {
        return this._angle;
    }
}