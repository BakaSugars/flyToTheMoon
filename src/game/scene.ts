import { IconManager } from "../render/iconManager";
import { Renderer } from "../render/renderer";
import stoneUrl from '../assets/stone.png';
import rocketUrl from '../assets/rocket.png';
import moonUrl from '../assets/moon.png';
import earthUrl from '../assets/earth.png';
import starUrl from '../assets/star.png';
import { Camera } from "./camera";
import { Rocket } from "./rocket";
import Point from "../utils/point";
import { AssetsManager } from "./assetsManager";
import { Moon } from "./moon";
import { Earth } from "./earth";
import { Icon } from "../render/icon";
import { EventName } from "../utils/constant";
import EventEmitter from "../utils/eventEmitter";
import { StarManager } from "./starManager";
import { StoneManager } from "./stoneManager";


export class Scene extends EventEmitter {
    private _iconManager = new IconManager();
    private _container: HTMLDivElement;
    private _renderer: Renderer;
    private _canvas: HTMLCanvasElement;
    private _camera: Camera;
    private _rocket: Rocket;
    private _moon: Moon;
    private _earth: Earth;
    private _assetsManager = new AssetsManager();
    private _starManager: StarManager;
    private _stoneManager: StoneManager;
    constructor(container: HTMLDivElement) {
        super();
        this._container = container;
    }

    public get earth() {
        return this._earth;
    }

    public get moon() {
        return this._moon;
    }

    public get camera() {
        return this._camera;
    }

    public async init() {
        this._initContainer();
        this._initRenderer();
        await this._loadAssets();
        this._initGameObj();
        this._initCamera();
        this.update();
        this._renderer.render();
    }

    public get starManager() {
        return this._starManager;
    }

    public get rocket() {
        return this._rocket;
    }

    public get iconManager() {
        return this._iconManager;
    }

    public get assetsManager() {
        return this._assetsManager;
    }

    public update() {
        this._camera.center = this._rocket.center.clone().add(new Point(0, 100));
        this._rocket.update(this._camera);
        this._moon.update(this._camera);
        this._earth.update(this._camera);
        this._starManager.update(this._camera);
        this._stoneManager.update(this._camera);
    }

    private async _loadAssets() {
        const promises = [];
        promises.push(this._assetsManager.loadImage('stone', stoneUrl));
        promises.push(this._assetsManager.loadImage('earth', earthUrl));
        promises.push(this._assetsManager.loadImage('rocket', rocketUrl));
        promises.push(this._assetsManager.loadImage('moon', moonUrl));
        promises.push(this._assetsManager.loadImage('star', starUrl));
        await Promise.all(promises);
    }

    private _initGameObj() {
        this._rocket = new Rocket({
            center: new Point(500, 500),
            angle: 0,
            height: 100,
            width: 50
        });
        this._rocket.setIcon(this._assetsManager.getAsset('rocket'));
        this._rocket.on(EventName.FRAME_CHANGE, () => {
            this._renderer.framePaint();
        });
        this._earth = new Earth({
            center: new Point(500, 80),
            angle: 0,
            height: 1000,
            width: 1000
        });
        this._earth.setIcon(this._assetsManager.getAsset('earth'));
        this._moon = new Moon({
            center: new Point(500, 1800),
            angle: 0,
            height: 500,
            width: 500
        });
        this._moon.setIcon(this._assetsManager.getAsset('moon'));
        this._moon.rocket = this._rocket;


        this._iconManager.add(this._earth.getIcon());
        this._iconManager.add(this._moon.getIcon());
        this._starManager = new StarManager(this);
        this._stoneManager = new StoneManager(this);
        this._iconManager.add(this._rocket.getIcon());


        this._rocket.setParent(this);
        this._moon.setParent(this);
        this._earth.setParent(this);
    }

    private _initCamera() {
        this._camera = new Camera({
            center: this._rocket.center.clone().add(new Point(0, 100)),
            angle: 0,
            width: this._canvas.width,
            height: this._canvas.height
        });
    }

    private _initContainer() {
        const width = this._container.clientWidth;
        const height = this._container.clientHeight;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this._container.appendChild(canvas);
        this._canvas = canvas;

        // const img = new Image();
        // img.src = stoneUrl;
        // const w = 10;
        // const h = 500;
        // const x = 800;
        // const y = 300;
        // let angle = 45
        // let r = angle * Math.PI / 180;
        // let cos = Math.cos(-r);
        // let sin = Math.sin(-r);
        // let rotatex = x * cos - y * sin;
        // let rotatey = y * cos + x * sin;
        // img.onload = () => {
        //     const ctx = canvas.getContext('2d');
        //     const loop = () => {
        //         window.requestAnimationFrame(() => {
        //             ctx.clearRect(0, 0, width, height);
        //             angle = angle + 3;
        //             r = angle * Math.PI / 180;
        //             cos = Math.cos(-r);
        //             sin = Math.sin(-r);
        //             rotatex = x * cos - y * sin;
        //             rotatey = y * cos + x * sin;
        //             ctx.rotate(r);
        //             ctx.drawImage(img, rotatex - w / 2, rotatey - h / 2, w, h);
        //             ctx.rotate(-r);
        //             loop();
        //         });
        //     };
        //     loop();
        //     console.log(img);
        // }
    }

    private _initRenderer() {
        this._renderer = new Renderer(this._canvas, this);
    }
}