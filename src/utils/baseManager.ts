import { Link } from "./link";
import { BaseObj } from "./baseObj";
import EventEmitter from "./eventEmitter";

export class BaseManager extends EventEmitter {
    protected _endLink: Link<BaseObj>;
    protected _idLinkMap: { [index: number]: Link<BaseObj> } = {};
    public add(obj: BaseObj) {
        const newLink = new Link<BaseObj>(obj);
        this._idLinkMap[obj.id] = newLink;
        if (!this._endLink) {
            this._endLink = newLink;
            return;
        }
        this._endLink.nextLink = newLink;
        this._endLink = newLink;
    }

    public delete(obj: BaseObj) {
        const link = this._idLinkMap[obj.id];
        if (link === this._endLink) {
            this._endLink = this._endLink.beforeLink;
        }
        link.destroy();
        delete this._idLinkMap[obj.id];
    }

    public clear() {
        this._endLink.forEachLink((link: Link<BaseObj>) => {
            link.destroy();
        });
        this._endLink = null;
        this._idLinkMap = {};
    }
}