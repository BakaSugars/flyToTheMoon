import EventEmitter from "../utils/eventEmitter";
import { Command, EventName } from "../utils/constant";
import Event from "../utils/event";

export const enum KeyCode {
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40,
    Q = 81,
    E = 69,
    W = 87,
    S = 83,
    A = 65,
    D = 68,
    Plus = 187,
    Minus = 189,
    PlusFirefox = 61,
    MinusFirefox = 173
}

const codeCommandMap = {};
codeCommandMap[KeyCode.Up] = Command.ACC;
codeCommandMap[KeyCode.Down] = Command.SLOW;
codeCommandMap[KeyCode.Left] = Command.LEFT;
codeCommandMap[KeyCode.Right] = Command.RIGHT;

export class Keyboard extends EventEmitter {
    private _onLoop: {[index: string]: boolean} = {};
    constructor() {
        super();
        this._regEvent();
    }

    private _regEvent() {
        const loop = (command: string) => {
            if (!this._onLoop[command]) {
                return;
            }
            this.emit(new Event(EventName.PUSH_COMMAND, command));
            window.requestAnimationFrame(() => {
                loop(command);
            });
        };
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const keyCode = e.keyCode;
            const command = codeCommandMap[keyCode];
            if (!command) {
                return;
            }
            if (this._onLoop[command]) {
                return;
            }
            this._onLoop[command] = true;
            loop(command);
        });

        document.addEventListener('keyup', (e: KeyboardEvent) => {
            const keyCode = e.keyCode;
            const command = codeCommandMap[keyCode];
            if (!command) {
                return;
            }
            this._onLoop[command] = false;
        });
    }
}