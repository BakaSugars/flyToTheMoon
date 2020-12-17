import { BaseElement } from "./baseElement";
import { Camera } from "./camera";
import Point from "../utils/point";

export class Stone extends BaseElement {
    private _angleRatio = (Math.random() - 0.5) * 5;
    private _speed: Point;
    public update(cam: Camera) {
        this._angle = this._angle + this._angleRatio;
        this._center = this._center.add(this._speed);
        super.update(cam);
    }

    public set speed(d: Point) {
        this._speed = d;
    }

    public get speed() {
        return this._speed;
    }
}