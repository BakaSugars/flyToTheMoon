import Point from "../utils/point";

export class CollisionCircle {
    private _center: Point;
    private _r: number;

    constructor(center: Point, r: number) {
        this._center = center;
        this._r = r;
    }

    public get center() {
        return this._center;
    }

    public get r() {
        return this._r;
    }

    public collsionCircle(collsion: CollisionCircle) {
        const vector = this.center.clone().sub(collsion.center);
        const length = vector.mag();
        if (length > (this.r + collsion.r)) {
            return false;
        } else {
            return true;
        }
    }
}