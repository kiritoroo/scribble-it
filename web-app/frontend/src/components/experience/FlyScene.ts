import * as $ from 'three'
import { gsap } from 'gsap'
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { animate } from 'framer-motion'

interface iMaterials {
  orange: $.MeshPhongMaterial,
  green: $.MeshPhongMaterial,
  brown: $.MeshPhongMaterial,
  pink: $.MeshPhongMaterial,
  gray: $.MeshPhongMaterial,
  clouds: $.MeshPhongMaterial,
  rabbit: $.MeshPhongMaterial
}

interface iConfig {
  x?: number,
  y?: number,
  z?: number,
  delay?: number
}

const materials = {
  orange: new $.MeshPhongMaterial({ color: 0xB7513C, flatShading: true }),
  green: new $.MeshPhongMaterial({ color: 0x379351, flatShading: true }),
  brown: new $.MeshPhongMaterial({ color: 0x5C2C22, flatShading: true }),
  pink: new $.MeshPhongMaterial({ color: 0xF9698D, flatShading: true }),
  gray: new $.MeshPhongMaterial({ color: 0x666666, flatShading: true }),
  clouds: new $.MeshPhongMaterial({ color: 0xeeeeee, flatShading: true }),
  rabbit: new $.MeshPhongMaterial({ color: 0xaaaaaa, flatShading: true }) 
};

export default class FlyScene {
  public threeGroup!: $.Group
  private carrot: Carrot;

  constructor() {
    this.threeGroup = new $.Group()
    this.carrot = new Carrot();
    this.threeGroup.add(this.carrot.mesh)
    this.threeGroup.add(new Text("Guidge by: ", "Mr. Trần Tiến Đức", { x: 200, z: -20, delay: 2 }).mesh)
    this.threeGroup.add(new Text("1st Dev: ","Thùy Trang", { x: 400, z: -20, delay: 4 }).mesh)
    this.threeGroup.add(new Text("2nd Dev: ","Thanh Tuyết", { x: 600, z: -20, delay: 6 }).mesh)
    this.threeGroup.add(new Cloud({ x: -5, z: 20}).mesh)
    this.threeGroup.add(new Cloud({ y: 0, z: 10, delay: 1 }).mesh)
    this.threeGroup.add(new Cloud({ y: 15, z: -10, delay: .5 }).mesh)
    this.threeGroup.add(new Cloud({ y: -15, z: 10, delay: 2 }).mesh)

    const floor = new $.Mesh(new $.PlaneGeometry(1000, 1000), new $.MeshBasicMaterial({ color: 0xe0dacd }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -80;
    this.threeGroup.add(floor);
  }

  public update(): void {
    this.carrot.update()
  }
}

class Text {
  public mesh: $.Group;
  public name: string;
  public role: string;

  constructor(role: string, name: string, config: iConfig) {
    this.mesh = new $.Group();
    this.name = name;
    this.role = role;

    this.mesh.position.x = config.x || 200;
    this.mesh.position.y = config.y || Math.random();
    this.mesh.position.z = config.z || 0;

    const text = this._createText();
    this.mesh.add(text);

    this.animate(config)
  }

  _createText(): $.Group {
    const group = new $.Group()
    const fontLoader = new FontLoader()
    fontLoader.load('/fonts/Urbanist_Pro.json',
    (font: Font) => {
      const material1 = materials.green
      const textGeom1 = new TextGeometry(this.name, {
        font: font,
        size: 10,
        height: 2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.8,
        bevelSize: 0.8,
        bevelOffset: 0,
        bevelSegments: 5
      })
      textGeom1.center()
      const text1 = new $.Mesh(textGeom1, material1);

      const material2 = materials.orange
      const textGeom2 = new TextGeometry(this.role, {
        font: font,
        size: 5,
        height: 2,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.5,
        bevelOffset: 0,
        bevelSegments: 3
      })
      textGeom2.center()
      const text2 = new $.Mesh(textGeom2, material2);
      text2.position.y += 12;

      group.add(text1);
      group.add(text2);
      shadowSupport(group);
      return group;
    })
    return group;
  }

  animate(config: iConfig) {
    gsap.to(this.mesh.position,{
      x: - 900 + this.mesh.position.x,
      duration: 30,
      repeat: Infinity,
      delay: config.delay || 0,
      onRepeat: () => {
        this.mesh.position.y = randomIntFromInterval(-10, 20);
      }
    })
  }
}

class Cloud {
  public mesh: $.Group;

  constructor(config: iConfig) {
    this.mesh = new $.Group()
    const cloud = this._createCloud()

    this.mesh.position.x = 200;
    this.mesh.position.y = config.y || Math.random();
    this.mesh.position.z = config.z || 0;
    this.mesh.add(cloud);

    this.animate(config);
  }

  _createCloud() {
    const group = new $.Group();

    const cloudGeo = new $.SphereGeometry(5, 4, 6);
    const cloud = new $.Mesh(cloudGeo, materials.clouds);
    cloud.scale.set(1, 0.8, 1);

    const cloud2 = cloud.clone();
    cloud2.scale.set(.55, .35, 1);
    cloud2.position.set(5, -1.5, 2);

    const cloud3 = cloud.clone();
    cloud3.scale.set(.75, .5, 1);
    cloud3.position.set(-5.5, -2, -1);

    group.add(cloud);
    group.add(cloud2);
    group.add(cloud3);

    shadowSupport(group);

    return group;
  }

  animate(config: iConfig) {
    gsap.to(this.mesh.position,{
      x: -200,
      duration: 5,
      repeat: Infinity,
      delay: config.delay || 0,
      onRepeat: () => {
        this.mesh.position.y = randomIntFromInterval(-10, 20);
      }
    })
  }
}

class Carrot {
  public mesh: $.Group;
  private body: $.Group;
  private wings: $.Group;
  private leafs: $.Group;
  private pilot: Pilot;
  private mousePos: { x: number, y: number};

  constructor() {
    this.mesh = new $.Group();
    this.body = this._createBody();
    this.wings = this._createWings();
    this.leafs = this._createLeafs();
    this.pilot = new Pilot();

    this.mousePos = {
      x: 0,
      y: 0
    };

    this.mesh.rotateOnAxis(new $.Vector3(1, 0, 0), -Math.PI / 2);
    this.mesh.rotateOnAxis(new $.Vector3(0, 0, 1), Math.PI / 2);

    this.mesh.add(this.body);
    this.mesh.add(this.wings);
    this.mesh.add(this.leafs);
    this.mesh.add(this.pilot.mesh);

    window.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    this.animate()
  }

  _createBody() {
    const group = new $.Group();

    const bodyGeom = new $.CylinderGeometry(5, 2, 25);

    group.add(new $.Mesh(bodyGeom, materials.orange));

    shadowSupport(group);

    return group;
  }

  _createWings() {
    const group = new $.Group();
    const geometry = new $.BoxGeometry(7, 7, 0.5);

    const wingR = new $.Mesh(geometry, materials.brown);
    wingR.position.x = 6;
    wingR.position.y = 2;
    wingR.position.z = 1;

    const wingL = wingR.clone();
    wingL.position.x = -6;
    wingL.rotation.y = Math.PI;

    group.add(wingR);
    group.add(wingL);

    shadowSupport(group);

    return group;
  }

  _createLeafs() {
    const group = new $.Group();
    const geometry = new $.CylinderGeometry(1.5, 1, 5, 4);

    const leafA = new $.Mesh(geometry, materials.green);
    leafA.position.y = 16;

    const leafB = leafA.clone();
    leafB.position.x = -1.75;
    leafB.position.y = 15;
    leafB.rotation.z = 0.4;

    const leafC = leafB.clone();
    leafC.position.x = leafB.position.x * -1;
    leafC.rotation.z = leafB.rotation.z * -1;

    group.add(leafA);
    group.add(leafB);
    group.add(leafC);

    shadowSupport(group);

    return group;
  }

  animate() {
    gsap.to(this.mesh.position, {
      x: -5,
      y: 5  ,
      duration: 2,
      repeat: Infinity,
      yoyo: true,
      ease: "circle"
    });

    gsap.to(this.mesh.rotation, {
      x: -1.7,
      duration: 1,
      repeat: Infinity,
      yoyo: true,
      ease: "easeInOut"
    });


    gsap.to(this.leafs.rotation, {
      y: Math.PI,
      duration: 0.1,
      repeat: Infinity,
      ease: "power0"
    });
  }

  handleMouseMove(event: MouseEvent) {
    var tx = -1 + (event.clientX / window.innerHeight) * 2;
    var ty = 1 - (event.clientY / window.innerWidth) * 2;
    this.mousePos = {
      x: tx,
      y: ty
    };
  }
  

  update() {
    var targetY = normalize(this.mousePos.y, -.75, .75, -80, 10);
    var targetX = normalize(this.mousePos.x, -.75, .75, -80, 10);
    // this.mesh.position.y += (targetY - this.mesh.position.y) * 0.1;
    // this.mesh.position.x += (targetX - this.mesh.position.x) * 0.1;

    gsap.to(this.mesh.position, {
      y: this.mesh.position.y +  (targetY - this.mesh.position.y) * 0.1,
      duration: 1,
      repeat: Infinity,
      yoyo: true,
      ease: "circle"
    });

    gsap.to(this.mesh.position, {
      x: this.mesh.position.x +  (targetX - this.mesh.position.x) * 0.1,
      duration: 1.25,
      repeat: Infinity,
      yoyo: true,
      ease: "circle"
    });
  }
}

class Pilot {
  public mesh: $.Group;
  private earPivotL!: $.Object3D;
  private earPivotR!: $.Object3D;
  private eye!: $.Mesh;
  private eyeb!: $.Mesh;
  public pilot: $.Group;

  constructor() {
    this.mesh = new $.Group();    
    this.pilot = this._createPilot();

    this.mesh.rotation.x = 1.5;
    this.mesh.position.set(0, 7, 5);

    this.mesh.add(this.pilot);

    this.animate();
  }

  _createPilot() {
    const group = new $.Group();

    const bodyGeo = new $.BoxGeometry(5, 5, 5);
    const body = new $.Mesh(bodyGeo, materials.rabbit);
    body.position.y = 1;
    body.position.z = 4;

    const seatGeo = new $.BoxGeometry(6, 1, 6);
    const seat = new $.Mesh(seatGeo, materials.brown);
    seat.position.set(0, -2.5, 0);
    seat.rotation.set(.25, 0, 0);
    body.add(seat);

    this.earPivotL = new $.Object3D();
    this.earPivotL.applyMatrix4(new $.Matrix4().makeTranslation(0, 2.5, 0));
    this.earPivotL.rotation.x = -Math.PI / 2.25;

    this.earPivotR = this.earPivotL.clone();
    this.earPivotR.rotation.x = -Math.PI / 3;

    const earGeo = new $.BoxGeometry(2, 6, 0.5);

    const ear = new $.Mesh(earGeo, materials.rabbit);
    ear.position.x = -1.5;
    ear.position.y = 2.5;

    const earInside = new $.Mesh(earGeo, materials.pink);
    earInside.scale.set(.5, .7, .5);
    earInside.position.set(0, 0, .25);
    ear.add(earInside);

    this.earPivotL.add(ear);
    body.add(this.earPivotL);

    const ear2 = ear.clone();
    ear2.position.x = ear.position.x * -1;
    this.earPivotR.add(ear2);
    body.add(this.earPivotR);

    const eyeGeo = new $.BoxGeometry(0.5, 1, 0.5);
    const eye = new $.Mesh(eyeGeo, materials.gray);
    eye.position.set(1, 0.5, 2.5);
    body.add(eye);
    this.eye = eye;

    const eyeb = eye.clone();
    eyeb.position.x = eye.position.x * -1;
    this.eyeb = eyeb;
    body.add(eyeb);

    const noseGeo = new $.BoxGeometry(0.5, 0.5, 0.5);
    const nose = new $.Mesh(noseGeo, materials.pink);
    nose.position.set(0, -.5, 2.5);
    body.add(nose);

    const mouthGeo = new $.BoxGeometry(.25, 0.25, 0.5);
    const mouth = new $.Mesh(mouthGeo, materials.gray);
    mouth.position.set(0, -1.5, 2.5);
    body.add(mouth);

    group.add(body);

    shadowSupport(group);

    return group;
  }

  animate() {
    gsap.to(this.earPivotL.rotation, {
      x: Math.sin(-Math.PI / 3),
      duration: 0.3,
      repeat: Infinity,
      yoyo: true });


    gsap.to(this.earPivotR.rotation, {
      x: -Math.PI / 2.25,
      duration: 0.3,
      repeat: Infinity,
      yoyo: true });


    gsap.to(this.eye.scale, {
      y: 0.1,
      duration: 0.5,
      repeat: Infinity,
      yoyo: true,
      delay: 5,
      repeatDelay: 3 });


    gsap.to(this.eyeb.scale, {
      y: 0.1,
      duration: 0.5,
      repeat: Infinity,
      yoyo: true,
      delay: 5,
      repeatDelay: 3 });
  }
}

const shadowSupport = (group: $.Group) => {

  group.traverse(object => {

    if (object instanceof $.Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
};

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);


const normalize = (v: number, vmin: number, vmax: number, tmin: number, tmax: number) => {
    var nv = Math.max(Math.min(v, vmax), vmin);
    var dv = vmax - vmin;
    var pc = (nv - vmin) / dv;
    var dt = tmax - tmin;
    var tv = tmin + (pc * dt);
    return tv;
  }