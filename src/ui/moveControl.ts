import EventEmitter from "../utils/eventEmitter";
import { BUTTON_SIZE, ABSOLUTE, Command, EventName } from "../utils/constant";
import { Button } from "./button";

interface IControlOption {
    container: HTMLDivElement;
}

const BOTTOM = '30px';
const RIGHT = '30px';

export class MoveControl extends EventEmitter {
    private _container: HTMLDivElement;
    private _buttons: Button[] = [];
    constructor(opt: IControlOption) {
        super();
        this._container = opt.container;
        this._initButtons();
    }

    private _initButtons() {
        const control = document.createElement('div');
        control.style.position = ABSOLUTE;
        control.style.right = RIGHT;
        control.style.bottom = BOTTOM;
        control.style.height = `${BUTTON_SIZE * 3}px`;
        control.style.width = `${BUTTON_SIZE * 3}px`;
        this._container.appendChild(control);

        let buttonDiv = document.createElement('div');
        buttonDiv.style.position = ABSOLUTE;
        buttonDiv.style.top = '0px';
        buttonDiv.style.left = `${BUTTON_SIZE}px`;
        control.appendChild(buttonDiv);
        const buttonUp = new Button({
            command: Command.ACC,
            container: buttonDiv
        });
        this._buttons.push(buttonUp);
        buttonUp.setParent(this);

        buttonDiv = document.createElement('div');
        buttonDiv.style.position = ABSOLUTE;
        buttonDiv.style.top = `${BUTTON_SIZE * 2}px`;
        buttonDiv.style.left = `${BUTTON_SIZE}px`;
        control.appendChild(buttonDiv);
        const buttonDown = new Button({
            command: Command.SLOW,
            container: buttonDiv
        });
        this._buttons.push(buttonDown);
        buttonDown.setParent(this);

        buttonDiv = document.createElement('div');
        buttonDiv.style.position = ABSOLUTE;
        buttonDiv.style.top = `${BUTTON_SIZE}px`;
        buttonDiv.style.left = `0px`;
        control.appendChild(buttonDiv);
        const buttonLeft = new Button({
            command: Command.LEFT,
            container: buttonDiv
        });
        this._buttons.push(buttonLeft);
        buttonLeft.setParent(this);

        buttonDiv = document.createElement('div');
        buttonDiv.style.position = ABSOLUTE;
        buttonDiv.style.top = `${BUTTON_SIZE}px`;
        buttonDiv.style.left = `${BUTTON_SIZE * 2}px`;
        control.appendChild(buttonDiv);
        const buttonRight = new Button({
            command: Command.RIGHT,
            container: buttonDiv
        });
        this._buttons.push(buttonRight);
        buttonRight.setParent(this);
    }
}