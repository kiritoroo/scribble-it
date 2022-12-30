import * as $ from 'three'
import Experience from '@core/Experience';

class Environment {

  public ambientLight: $.AmbientLight
  public hemisLight: $.HemisphereLight;
  public shadowLight: $.DirectionalLight;

  private experience: Experience = new Experience();

  constructor() {

    this.ambientLight = new $.AmbientLight(0xc5f5f5, 1)
    this.hemisLight = new $.HemisphereLight(0xffffff, 0xb3858c, 0.5);
    this.shadowLight = new $.DirectionalLight(0xffffff, 0.8);

    this.init()
  }

  //---------Config----------
  private init() {
    this.configLight();
  }

  private configLight(): void {
    this.shadowLight.position.set(30, 20, 0);
    this.shadowLight.castShadow = true;
  }

  public update(): void {
    // cập nhật
    
  }
}




export default Environment;