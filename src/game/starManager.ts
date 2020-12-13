import { BaseManager } from "../utils/baseManager";
import { Scene } from "./scene";
import { BaseElement } from "./baseElement";
import Point from "../utils/point";
import { Star } from "./start";
import { Camera } from "./camera";
import { CollisionCircle } from "./collisionCircle";
import { EventName } from "../utils/constant";
import Event from "../utils/event";

const circleCount = 100;
const circleRDistance = 3;
const circleAngleDistance = 7;
const circleSize = 20;

export class StarManager extends BaseManager {
    private _scene: Scene;
    constructor(scene: Scene) {
        super();
        this._scene = scene;
        this._init();
    }

    public update(cam: Camera) {
        this._endLink.forEach((star: Star) => {
            if (star.collisionArray.some((starCircle: CollisionCircle) => {
                return this._scene.rocket.collisionArray.some((rocketCircle: CollisionCircle) => {
                    return starCircle.collsionCircle(rocketCircle);   
                });
            })) {
                this.delete(star);
                this._scene.iconManager.delete(star.getIcon());
                this._scene.rocket.emit(new Event(EventName.EAT_STAR, star));
                return;
            }
            star.update(cam);
        });
    }

    private _init() {
        const objArr = [this._scene.earth, this._scene.moon];
        let flag = 1;
        const line: Point[] = [];
        objArr.forEach((obj: BaseElement) => {
            const r = obj.width / 2;
            let center = obj.center;
            let lastPoint = center.clone().add(new Point(0, (r + 60) * flag));
            for(let i = 0; i < circleCount; i++) {
                const vector = lastPoint.clone().sub(center);
                vector.add(vector.clone().unit().mult(circleRDistance));
                vector.rotate(circleAngleDistance * Math.PI / 180);
                const newPoint = center.clone().add(vector);
                this._addStar(newPoint);
                lastPoint = newPoint;
            }
            flag = -flag;
            line.push(lastPoint);
        });
        const vector = line[1].clone().sub(line[0]).unit();
        let lastPoint = line[0];
        for (let i = 0; i < 7; i++) {
            const newPoint = lastPoint.clone().add(vector.clone().mult(80));
            console.log(newPoint);
            this._addStar(newPoint);
            lastPoint = newPoint;
        }
        
    }

    private _addStar(center: Point) {
        const star = new Star({
            center: center,
            angle: 0,
            height: circleSize,
            width: circleSize
        });
        star.setParent(this);
        star.setIcon(this._scene.assetsManager.getAsset('star'));
        this.add(star);
        this._scene.iconManager.add(star.getIcon());
    }
}