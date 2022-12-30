import * as $ from 'three';
import Experience from '@core/Experience';

import Environment from './Environment';
import FlyScene from './FlyScene';

class World {

  public threeWorld: $.Group;

  private experience: Experience = new Experience();
  private scene = this.experience.scene;

  // private sky: Sky;
  private environment: Environment;
  private flyScene: FlyScene; 

  constructor() {
    this.threeWorld = new $.Group();
    this.environment = new Environment();
    this.flyScene = new FlyScene();

    this.init();
  }

  private init(): void {
    // environment
    this.threeWorld.add(this.environment.ambientLight);
    this.threeWorld.add(this.environment.hemisLight);
    this.threeWorld.add(this.environment.shadowLight);

    this.threeWorld.add(this.flyScene.threeGroup);
  }

  public resize(): void {

  }

  public update(): void {
    this.environment.update();
    this.flyScene.update();
  }
}

export default World;