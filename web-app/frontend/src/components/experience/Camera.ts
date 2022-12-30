import * as $ from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Experience from '@core/Experience';

export default class Camera {
  public camera: $.PerspectiveCamera;
  public controls: OrbitControls;

  private experience: Experience = new Experience();
  private canvas = this.experience.canvas;
  private size = this.experience.size;

  constructor() {
    this.camera = new $.PerspectiveCamera(
      45,
      this.size.aspect,
      1,
      1000
    )

    this.controls = new OrbitControls(
      this.camera, 
      this.canvas
    );

    this.init();
  }

  //---------- Config ----------
  private init(): void {
    this.configCamera();
    this.configControl();
  }

  private configCamera(): void {
    this.camera.position.set(40, 20, 80);
    this.camera.lookAt(new $.Vector3(0, 0, 0));
  }

  private configControl(): void {
    // this.controls.enabled = true;
    // this.controls.enableDamping = true;
    // this.controls.enableZoom = true;
    // this.controls.enablePan = true;
    // this.controls.enableRotate = true;
    // this.controls.minPolarAngle = -Math.PI / 2;
    // this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minDistance = 50;
    this.controls.maxDistance = 250;
  }

  //---------- Event ----------
  public resize(): void {
    this.camera.aspect = this.size.aspect;
    this.camera.updateProjectionMatrix();
  }

  // ---------- Update ----------
  public update(): void {
    this.controls.update();
  }
}