import Event from './event';
import { BaseObj } from './baseObj';
/**
 * 事件回调函数
 */
export type Listener = (e: Event) => any;
interface IListeners {
    [type: string]: Listener[];
}

let isInEventTime = false;


export default class EventEmitter extends BaseObj {
    private _listeners: IListeners;
    private _oneTimeListeners: IListeners;
    private _parent: EventEmitter;
    private _destroyed = false;

    public get destroyed() {
        return this._destroyed;
    }

    public get isInEventTime(): boolean {
        return isInEventTime;
    }

    public set isInEventTime(condition: boolean) {
        isInEventTime = condition;
    }

    public on(type: string, listener: Listener): EventEmitter {
        this._listeners = this._listeners || {};
        this._listeners[type] = this._listeners[type] || [];
        this._listeners[type].push(listener);
        return this;
    }

    public once(type: string, listener: Listener): EventEmitter {
        this._oneTimeListeners = this._oneTimeListeners || {};
        this._oneTimeListeners[type] = this._oneTimeListeners[type] || [];
        this._oneTimeListeners[type].push(listener);
        return this;
    }

    public off(type: string, listener: Listener): EventEmitter {
        this._removeEventListener(type, listener, this._listeners);
        this._removeEventListener(type, listener, this._oneTimeListeners);
        return this;
    }

    public emit(event: Event): EventEmitter {
        if (this._listeners && this._listeners[event.type] && this._listeners[event.type].length > 0) {
            const listeners = this._listeners[event.type].slice();
            for (const listener of listeners) {
                listener.call(this, event);
            }
        }
        if (
            this._oneTimeListeners &&
            this._oneTimeListeners[event.type] &&
            this._oneTimeListeners[event.type].length > 0
        ) {
            const listeners = this._oneTimeListeners[event.type].slice();
            for (const listener of listeners) {
                this.off(event.type, listener);
                listener.call(this, event);
            }
        }
        if (this._parent) {
            this._parent.emit(event);
        }
        return this;
    }

    /**
     * @ignore
     */
    public setParent(parent: EventEmitter) {
        this._parent = parent;
    }

    public destroy() {
        this._listeners = {};
        this._oneTimeListeners = {};
        this._parent = null;
        this._destroyed = true;
    }

    private _removeEventListener(type: string, listener: Listener, listenerList: IListeners) {
        if (listenerList && listenerList[type]) {
            const index = listenerList[type].indexOf(listener);
            if (index !== -1) {
                listenerList[type].splice(index, 1);
            }
        }
    }
}
