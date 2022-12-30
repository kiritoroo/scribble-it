import * as $ from 'three'

import Size from './Size';
import Time from './Time';
import Camera from './Camera';
import Renderer from './Renderer';

import World from './World';

export default class Experience {
  public static instance: Experience | undefined = undefined;
  public scene!: $.Scene;
  public size!: Size;
  public time!: Time;
  public camera!: Camera; 
  public renderer!: Renderer;
  public isRender?: boolean

  public world!: World;

  constructor(readonly canvas?: HTMLCanvasElement, readonly newInstance: boolean = false) {
    if (Experience.instance && !newInstance) {
      return Experience.instance;
    }

    Experience.instance = this;

    this.scene = new $.Scene();
    this.size = new Size();
    this.time = new Time();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.isRender = false;

    this.world = new World();

    this.init();
  }

  public init(): void {
    this.configScene();
    this.bindEvent();
  }

  configScene() {
    this.scene.fog = new $.Fog(0xd5f8f8, 100, 300);
    // this.scene.background = new $.Color('#FFFFFF');
    this.scene.add(this.world.threeWorld);
    this.scene.add(this.camera.camera);
  }

  bindEvent() {
    document.addEventListener('eResize', () => this.resize());
    document.addEventListener('eUpdate', () => this.update());
  }

  private resize(): void {
    if ( this.world ) this.world.resize();
    this.camera.resize();
    this.renderer.resize();
  }

  public update(): void {
    if (this.isRender) {
      if ( this.world ) this.world.update();
      this.renderer.update();
    }
  }

  public removeEvents(): void {
    this.isRender = false
    document.removeEventListener('eResize', () => this.resize());
    document.removeEventListener('eUpdate', () => this.update());
  }

  public setRender(value: boolean): void {
    this.isRender = value
  }
}