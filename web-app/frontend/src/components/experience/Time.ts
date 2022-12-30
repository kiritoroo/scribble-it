import { emitEvent } from '@util/eventUtil';

class Time {

  private start: number;
  public current: number;
  public elapsed: number;
  public delta: number;
  public animationFrameId?: number;

  constructor() {
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this.update();
    this.animationFrameId = window.requestAnimationFrame(() => this.update());
  }

  update() {
    this.animationFrameId = window.requestAnimationFrame(() => this.update());
    const currentTime: number = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    if (this.delta > 60) {
      this.delta = 60;
    }
    
    emitEvent('eUpdate');
  }
}

export default Time;