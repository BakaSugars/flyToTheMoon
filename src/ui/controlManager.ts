import EventEmitter from "../utils/eventEmitter";
import { MoveControl } from "./moveControl";
import { BaseElement } from "../game/baseElement";
import { EventName } from "../utils/constant";
import { getId } from "../utils/util";
import Event from "../utils/event";

export class ControlManager extends EventEmitter {
    private _container: HTMLDivElement
    private _moveControl: MoveControl;
    private _commandArray: string[] = [];
    private _frameId: number;
    private _connectedObj: BaseElement;
    constructor(container: HTMLDivElement) {
        super();
        this._container = container;
        this._initControls();
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