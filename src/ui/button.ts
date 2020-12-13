import EventEmitter from "../utils/eventEmitter";
import Event from "../utils/event";
import { EventName, BUTTON_SIZE } from "../utils/constant";

interface IButtonOption {
    command: string,
    container: HTMLDivElement;
}

export class Button extends EventEmitter {
    private _container: HTMLDivElement;
    private _command: string;
    private _onLoop: boolean = false;
    constructor(opt: IButtonOption) {
        super();
        this._container = opt.container;
        this._command = opt.command;
        this._createButton();
        this._regEvent();
    }

    private _createButton() {
        const button = document.createElement('div');
        button.innerHTML = this._command;
        button.style.textAlign = 'center';
        button.style.lineHeight = `${BUTTON_SIZE}px`;
        button.classList.add('button');
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
        button.style.height = `${BUTTON_SIZE}px`;
        button.style.width = `${BUTTON_SIZE}px`;
        button.style.userSelect = 'none';
        this._container.appendChild(button);
    }

    private _regEvent() {
        const loop = () => {
            if (!this._onLoop) {
                return;
            }
            this.emit(new Event(EventName.PUSH_COMMAND, this._command));
            window.requestAnimationFrame(() => {
                loop();
            });
        };
        this._container.onmousedown = () => {
            if (this._onLoop) {
                return;
            }
            this._onLoop = true;
            loop();
        };
        this._container.ontouchstart = () => {
            if (this._onLoop) {
                return;
            }
            this._onLoop = true;
            loop();
        };
        this._container.onmouseup = () => {
            this._onLoop = false;
        }
        this._container.ontouchend = () => {
            this._onLoop = false;
        }
    }
}