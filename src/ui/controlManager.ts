import EventEmitter from "../utils/eventEmitter";
import { MoveControl } from "./moveControl";
import { BaseElement } from "../game/baseElement";
import { EventName, Command } from "../utils/constant";
import { getId } from "../utils/util";
import Event from "../utils/event";
import { Keyboard } from "./keyboard";

export class ControlManager extends EventEmitter {
    private _container: HTMLDivElement
    private _moveControl: MoveControl;
    private _commandArray: string[] = [];
    private _frameId: number;
    private _connectedObj: BaseElement;
    private _keyboard: Keyboard;
    constructor(container: HTMLDivElement) {
        super();
        this._container = container;
        this._initControls();
        this._keyboard = new Keyboard();
        this._keyboard.setParent(this);
        this.onPushCommand = this.onPushCommand.bind(this);
    }

    public connect(element: BaseElement) {
        this._connectedObj = element;
        this.on(EventName.PUSH_COMMAND, this.onPushCommand);
    }

    public disconnect() {
        this._connectedObj = null;
        this.off(EventName.PUSH_COMMAND, this.onPushCommand);
    }

    public onPushCommand(e) {
        this._commandArray.push(e.data);
        if (!this._frameId) {
            this._frameId = getId();
            window.requestAnimationFrame(() => {
                this._frameId = undefined;
                if (!this._connectedObj) {
                    return;
                }
                this._connectedObj.emit(new Event(EventName.FRAME_COMMAND, this._commandArray));
                this._commandArray = [];
            });
        }
    }

    private _initControls() {
        this._moveControl = new MoveControl({container: this._container});
        this._moveControl.setParent(this);
    }
}