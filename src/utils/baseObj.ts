import { getId } from "./util";

export class BaseObj {
    private _id = getId();
    public get id() {
        return this._id;
    }
}