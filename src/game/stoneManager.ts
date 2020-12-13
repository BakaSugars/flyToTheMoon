import { BaseManager } from "../utils/baseManager";
import { Scene } from "./scene";
import { Camera } from "./camera";
import Point from "../utils/point";
import { Stone } from "./stone";
import { CollisionCircle } from "./collisionCircle";
import { EventName } from "../utils/constant";
import Event from "../utils/event";

const burstNum = 50;
const sizeMax = 50;
const sizeMin = 10;
const space = 500;
const speedMin = 0.1;
const speedMax = 2;

export class StoneManager extends BaseManager {
    private _scene: Scene;
    constructor(scene: Scene) {
        super();
        this._scene = scene;
        setTimeout(() => {
            this._stoneBurst();
        }, 0);
        setInterval(() => {
            this._stoneBurst();
        }, 5000);
    }

    public update(cam: Camera) {
        if (!this._endLink) {
            return;
        }
        this._endLink.forEach((stone: Stone) => {
            if (stone.collisionArray.some((stoneCircle: CollisionCircle) => {
                return this._scene.rocket.collisionArray.some((rocketCircle: CollisionCircle) => {
                    return stoneCircle.collsionCircle(rocketCircle);
                });
            })) {
                this.delete(stone);
                this._scene.iconManager.delete(stone.getIcon());
                this._scene.rocket.emit(new Event(EventName.COLLID_STONE, stone));
                return;
            }
            const vector = stone.center.clone().sub(cam.center);
            if (
                Math.abs(vector.x) > cam.width + 1000 ||
                Math.abs(vector.y) > cam.height + 1000
            ) {
                this.delete(stone);
                this._scene.iconManager.delete(stone.getIcon());
                return;
            }
            stone.update(cam);
        });
    }

    private _stoneBurst() {
        for(let i = 0; i < burstNum; i ++) {
            const center = new Point(
                this._scene.camera.center.x + (this._scene.camera.width + space * Math.random()) * ((Math.random() - 0.5) > 0 ? 1 : -1),
                this._scene.camera.center.y + (this._scene.camera.height + space * Math.random()) * ((Math.random() - 0.5) > 0 ? 1 : -1),
            )
            const width = sizeMin + Math.random() * (sizeMax - sizeMin);

            const stone = new Stone({
                center,
                height: width,
                width,
                angle: Math.random() * 360
            });

            const speed = speedMin + Math.random() * (speedMax - speedMin);
            const vector = this._scene.rocket.center.clone().sub(center).unit();
            vector.rotate((Math.random() - 0.5) * Math.PI).mult(speed);
            stone.speed = vector;
            
            stone.setIcon(this._scene.assetsManager.getAsset('stone'));
            stone.setParent(this);
            this.add(stone);
            this._scene.iconManager.add(stone.getIcon());
        }
    }
}