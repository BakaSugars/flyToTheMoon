import { BaseElement } from "./baseElement";
import { Rocket } from "./rocket";
import { Camera } from "./camera";
import Event from "../utils/event";
import { EventName } from "../utils/constant";

export class Moon extends BaseElement {
    private _rocket: Rocket;
    
    set rocket(r: Rocket) {
        this._rocket = r;
    }

    public update(cam: Camera) {
        super.update(cam);
        this.emit(new Event(EventName.UPDATE_DIRECTION, this._rocket.center.clone().sub(this._center).unit()));
        if (this._rocket.center.clone().sub(this._center).mag() < 250) {
            this.emit(new Event(EventName.GAME_END, this._rocket));
        }
    }
}