import { BaseObj } from "../utils/baseObj";
import { BaseElement, IElementOpt } from "./baseElement";
import { EventName, Command } from "../utils/constant";
import Event from "../utils/event";
import Point from "../utils/point";
import { getId } from "../utils/util";
import { CollisionCircle } from "./collisionCircle";
import { Stone } from "./stone";

const SpeedAdd = 0.01;
const SpeedSlow = 0.02;
const RotateSpeed = 2;
const addSpeedK = 4

export class Rocket extends BaseElement {
    private _speed = new Point(0, 0);
    private _frameId: number;
    private _collisionTime = 0;
    private _starCount = 0;
    constructor(opt: IElementOpt) {
        super(opt);
        this.on(EventName.FRAME_COMMAND, (e: Event) => {
            const commandArray = e.data;
            commandArray.forEach((command: string) => {
                if (command === Command.ACC) {
                    const unit = (new Point(0, 1)).rotate(-this.angle * Math.PI / 180).mult(SpeedAdd);
                    this._speed = this._speed.add(unit);
                }
                if (command === Command.SLOW) {
                    const nowSpeed = this._speed.mag();
                    if (nowSpeed <= SpeedSlow) {
                        this._speed = new Point(0, 0);
                    } else {
                        this._speed = this._speed.add(this._speed.clone().unit().mult(-SpeedSlow));
                    }
                }
                if (command === Command.LEFT) {
                    this._speed = this._speed.rotate(RotateSpeed * Math.PI / 180);
                    this._angle -= RotateSpeed
                    this.emit(new Event(EventName.FRAME_CHANGE));
                }
                if (command === Command.RIGHT) {
                    this._speed = this._speed.rotate(-RotateSpeed * Math.PI / 180);
                    this._angle += RotateSpeed
                    this.emit(new Event(EventName.FRAME_CHANGE));
                }
            });
            this._update();
        });
        this.on(EventName.EAT_STAR, (e) => {
            this._starCount ++;
        });
        this.on(EventName.COLLID_STONE, (e) => {
            const stone = e.data as Stone;
            const stoneSize = stone.width * stone.height;
            const rocketSize = this.width * this.height;
            const rocketExralSpeed = stone.speed.clone().mult(stoneSize / rocketSize * addSpeedK);
            this._speed = this._speed.add(rocketExralSpeed);

            this._collisionTime ++;
        });
    }

    public get collsionTime() {
        return this._collisionTime;
    }

    public get starCount() {
        return this._starCount
    }

    public set speed(s: Point) {
        this._speed = s;
    }

    protected _initCollision() {
        const vector = new Point(0, 1);
        vector.rotate(this._angle * Math.PI / 180);
        const r = this.width / 2;
        const center1 = this._center.clone().add(vector.clone().mult(r));
        const center2 = this._center.clone().sub(vector.clone().mult(r));
        this._collisionArray = [
            new CollisionCircle(center1, r),
            new CollisionCircle(center2, r)
        ];
    }

    private _update() {
        if (this._speed.mag() !== 0) {
            if (this._frameId) {
                return;
            }
            this._frameId = getId();
            this._center = this._center.add(this._speed);
            this.emit(new Event(EventName.FRAME_CHANGE));
            requestAnimationFrame(() => {
                this._frameId = undefined;
                this._update();
            });
        }
    }
}