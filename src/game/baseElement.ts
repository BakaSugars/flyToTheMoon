import Point from "../utils/point";
import { Icon } from "../render/icon";
import { CollsionBox } from "./collisionBox";
import { Camera } from "./camera";
import EventEmitter from "../utils/eventEmitter";
import { CollisionCircle } from "./collisionCircle";

export interface IElementOpt {
    center: Point;
    angle: number;
    width: number;
    height: number;
}

export class BaseElement extends EventEmitter {
    protected _center: Point;
    protected _angle: number;
    private _icon: Icon;
    private _width: number;
    private _height: number;
    protected _collisionArray: CollisionCircle[] = [];
    constructor(opt: IElementOpt) {
        super();
        this._center = opt.center;
        this._angle = opt.angle;
        this._width = opt.width;
        this._height = opt.height;
        this._initCollision();
    }

    public setIcon(icon: HTMLImageElement) {
        this._icon = new Icon({
            width: this._width,
            height: this._height,
            angle: this._angle,
            image: icon,
            canvasX: 0,
            canvasY: 0
        });
    }

    public getIcon() {
        return this._icon;
    }

    public get collisionArray() {
        return this._collisionArray;
    } 

    public get center() {
        return this._center;
    }

    public get angle() {
        return this._angle;
    }

    public set angle(angle: number) {
        this._angle = angle;
    }

    public get width() {
        return this._width;
    }

    public get height() {
        return this._height;
    }

    public update(cam: Camera) {
        this._initCollision();
        const canvasX = this.center.x - cam.center.x + cam.width / 2;
        const canvasY = cam.center.y - this.center.y + cam.height / 2;
        this._icon.canvasX = canvasX;
        this._icon.canvasY = canvasY;
        this._icon.angle = this._angle;
    }

    protected _initCollision() {
        // const maxx = this._center.x + this._width / 2;
        // const maxy = this._center.y + this._height / 2;
        // const minx = this._center.x - this._width / 2;
        // const miny = this._center.y - this._height / 2;
        // this._collisionBox = new CollsionBox({
        //     maxx,
        //     maxy,
        //     minx,
        //     miny
        // });
        const r = (this._width + this.height) / 4;
        this._collisionArray.push(new CollisionCircle(this.center, r));
    }
}