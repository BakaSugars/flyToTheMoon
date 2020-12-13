import EventEmitter from "../utils/eventEmitter";
import { Mask } from "./mask";
import { ControlManager } from "./controlManager";
import { Rocket } from "../game/rocket";
import Point from "../utils/point";

export class UiManager extends EventEmitter {
    private _container: HTMLDivElement;
    private _mask: Mask;
    private _controlManager: ControlManager;
    private _ended = false;
    constructor(container: HTMLDivElement) {
        super();
        this._container = container;
        this._mask = new Mask();
        this._controlManager = new ControlManager(container);
    }

    public get controlManager() {
        return this._controlManager;
    }

    public endGame(rocket: Rocket) {
        if (this._ended) {
            return;
        }
        this._ended = true;
        this._mask.show();
        rocket.speed = new Point(0, 0);
        const score = Math.max(rocket.starCount * 100 - rocket.collsionTime * 300, 0);
        const maxScore = window.localStorage.getItem('maxScore') || score + '';
        console.log(maxScore);
        const updateMaxScore = Math.max(parseInt(maxScore), score);
        window.localStorage.setItem('maxScore', updateMaxScore + '');
        const endDiv = document.createElement('div');
        endDiv.style.margin = '0 auto';
        endDiv.style.marginTop = '200px';
        endDiv.style.width = '300px';
        endDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        endDiv.style.borderRadius = '10px';
        endDiv.style.fontSize = '30px';
        endDiv.innerHTML = `登月成功，总得分：${score}, 我的最高记录：${updateMaxScore}`;
        this._mask.element.appendChild(endDiv);
        
        const refreshButton = document.createElement('div');
        refreshButton.style.margin = '0 auto';
        refreshButton.style.marginTop = '20px';
        refreshButton.style.width = '300px';
        refreshButton.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        refreshButton.style.borderRadius = '10px';
        refreshButton.style.fontSize = '30px';
        refreshButton.innerHTML = '再来一次';
        refreshButton.onclick = () => {
            window.location.reload();
        }
        this._mask.element.appendChild(refreshButton);
    }
}