export default class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
    public get x() { return this._x }
    public get y() { return this._y }

    public add(p: Point) {
        this._x += p.x;
        this._y += p.y;
        return this;
    }

    public sub(p: Point) {
        this._x -= p.x;
        this._y -= p.y;
        return this;
    }

    public unit() {
        const mag = this.mag();
        if (mag === 0) {
            return this;
        }
        this.div(this.mag());
        return this;
    }

    public mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public mult(n: number): Point {
        this._x *= n;
        this._y *= n;
        return this;
    }

    public multVector(v: Point) {
        return v.x * this._x + v.y * this._y;
    }

    public div(n: number): Point {
        this._x /= n;
        this._y /= n;
        return this;
    }

    public clone() {
        return new Point(this._x, this._y);
    }

    public toArray() {
        return [this.x, this.y];
    }

    public reverse() {
        this._x = -this._x;
        this._y = -this._y;
        return this;
    }

    public rotate(r: number) {
        const x = this._x;
        const y = this._y;
        this._x = x * Math.cos(r) - y * Math.sin(r);
        this._y = x * Math.sin(r) + y * Math.cos(r);
        return this;
    }
}