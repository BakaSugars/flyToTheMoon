import logoUrl from '../assets/logo.png';
export class StartPage {
    private _container: HTMLDivElement;
    private _info: HTMLDivElement;
    constructor() {
        this._container = document.getElementById('startPage') as HTMLDivElement;
        this._init();
    }

    private _init() {
        const image = document.createElement('img');
        image.src = logoUrl;
        image.style.width = '319px';
        image.style.height = '200ps';
        image.style.marginTop = '60px';
        this._container.appendChild(image);

        const startButton = document.createElement('div');
        startButton.style.margin = '0 auto';
        startButton.style.marginTop = '20px';
        startButton.style.width = '200px';
        startButton.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        startButton.style.borderRadius = '10px';
        startButton.style.fontSize = '30px';
        startButton.innerHTML = '开始游戏';

        this._container.appendChild(startButton);
        startButton.onclick = () => {
            this.hide();
        };

        const infoButton = document.createElement('div');
        infoButton.style.margin = '0 auto';
        infoButton.style.marginTop = '20px';
        infoButton.style.width = '200px';
        infoButton.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        infoButton.style.borderRadius = '10px';
        infoButton.style.fontSize = '30px';
        infoButton.innerHTML = '游戏说明';

        

        const info = document.createElement('div');
        this._info = info;
        info.style.margin = '0 auto';
        info.style.marginTop = '20px';
        info.style.width = '360px';
        info.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        info.style.borderRadius = '10px';
        info.style.fontSize = '30px';
        info.style.visibility = 'hidden';
        info.innerHTML = '驾驶飞船，飞向月球，吃到更多星星获得分数奖励，被陨石撞击会扣分并且飞船速度会受到冲击,使用方向键或者屏幕上的虚拟方向键控制飞船';

        let flag = false;
        infoButton.onclick = () => {
            if (!flag) {
                info.style.visibility = 'visible';
            } else {
                info.style.visibility = 'hidden';
            }
            flag = !flag;
        }
        
        this._container.appendChild(infoButton);
        this._container.appendChild(info);
    }

    public hide() {
        this._info.style.visibility = 'hidden';
        this._container.style.visibility = 'hidden';
    }
}