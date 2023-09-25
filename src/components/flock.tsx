import * as THREE from "three";
import * as http from "http";
import { useEffect, useRef } from "react";

class Bird extends THREE.BufferGeometry {
  constructor() {
    super();

    const vertices = [
      new THREE.Vector3(5, 0, 0),
      new THREE.Vector3(-5, -2, 1),
      new THREE.Vector3(-5, 0, 0),
      new THREE.Vector3(-5, -2, -1),
      new THREE.Vector3(0, 2, -6),
      new THREE.Vector3(0, 2, 6),
      new THREE.Vector3(2, 0, 0),
      new THREE.Vector3(-3, 0, 0),
    ];

    const indices = [0, 2, 1, 4, 7, 6, 5, 6, 7];

    this.setFromPoints(vertices);
    this.setIndex(indices);

    this.computeBoundingSphere();
  }
}

class Boid {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  _acceleration: THREE.Vector3;
  vector: THREE.Vector3;
  _width: number;
  _height: number;
  _depth: number;
  _goal: THREE.Vector3;
  _neighborhoodRadius: number;
  _maxSpeed: number;
  _maxSteerForce: number;
  _avoidWalls: boolean;

  constructor() {
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this._acceleration = new THREE.Vector3();
    this.vector = new THREE.Vector3();
    this._width = 900;
    this._height = 900;
    this._depth = 1600;
    this._goal = new THREE.Vector3();
    this._neighborhoodRadius = 800;
    this._maxSpeed = 1;
    this._maxSteerForce = 0.1;
    this._avoidWalls = false;
  }

  setGoal = (target: THREE.Vector3) => {
    this._goal = target;
  };

  setAvoidWalls = (value: boolean) => {
    this._avoidWalls = value;
  };

  setWorldSize = (width: number, height: number, depth: number) => {
    this._width = width;
    this._height = height;
    this._depth = depth;
  };

  run = (boids: Boid[]) => {
    if (this._avoidWalls) {
      this.vector.set(-this._width, this.position.y, this.position.z);
      this.vector = this.avoid(this.vector);
      this.vector.multiplyScalar(19);
      this._acceleration.add(this.vector);

      this.vector.set(this._width, this.position.y, this.position.z);
      this.vector = this.avoid(this.vector);
      this.vector.multiplyScalar(19);
      this._acceleration.add(this.vector);

      this.vector.set(this.position.x, -this._height, this.position.z);
      this.vector = this.avoid(this.vector);
      this.vector.multiplyScalar(19);
      this._acceleration.add(this.vector);

      this.vector.set(this.position.x, this._height, this.position.z);
      this.vector = this.avoid(this.vector);
      this.vector.multiplyScalar(19);
      this._acceleration.add(this.vector);

      this.vector.set(this.position.x, this.position.y, -this._depth);
      this.vector = this.avoid(this.vector);
      this.vector.multiplyScalar(15);
      this._acceleration.add(this.vector);

      this.vector.set(this.position.x, this.position.y, this._depth);
      this.vector = this.avoid(this.vector);
      this.vector.multiplyScalar(5);
      this._acceleration.add(this.vector);
    }

    if (Math.random() > 0.5) {
      this.flock(boids);
    }

    this.move();
  };

  flock = (boids: Boid[]) => {
    if (this._goal) {
      this._acceleration.add(this.reach(this._goal, 0.9));
    }

    this._acceleration.add(this.alignment(boids));
    this._acceleration.add(this.cohesion(boids));
    this._acceleration.add(this.separation(boids));
  };

  move = () => {
    this.velocity.add(this._acceleration);

    let l = this.velocity.length();

    if (l > this._maxSpeed) {
      this.velocity.divideScalar(l / this._maxSpeed);
    }

    this.position.add(this.velocity);
    this._acceleration.set(0, 0, 0);
  };

  checkBounds = () => {
    if (this.position.x > this._width) this.position.x = -this._width;
    if (this.position.x < -this._width) this.position.x = this._width;
    if (this.position.y > this._height) this.position.y = -this._height;
    if (this.position.y < -this._height) this.position.y = this._height;
    if (this.position.z > this._depth) this.position.z = -this._depth;
    if (this.position.z < -this._depth) this.position.z = this._depth;
  };

  avoid = (target: THREE.Vector3) => {
    let steer = new THREE.Vector3();

    steer.copy(this.position);
    steer.sub(target);

    steer.multiplyScalar(1 / this.position.distanceToSquared(target));

    return steer;
  };

  repulse = (target: THREE.Vector3) => {
    let distance = this.position.distanceTo(target);

    if (distance < 200) {
      let steer = new THREE.Vector3();

      steer.subVectors(this.position, target);
      steer.multiplyScalar(0.9 / distance);

      this._acceleration.add(steer);
    }
  };

  reach = (target: THREE.Vector3, amount: number) => {
    let steer = new THREE.Vector3();

    steer.subVectors(target, this.position);
    steer.multiplyScalar(amount);

    return steer;
  };

  alignment = (boids: Boid[]) => {
    let boid,
      velSum = new THREE.Vector3(),
      count = 0;

    for (var i = 0, il = boids.length; i < il; i++) {
      if (Math.random() > 0.5) continue;

      boid = boids[i];

      let distance = boid.position.distanceTo(this.position);

      if (distance > 0 && distance <= this._neighborhoodRadius) {
        velSum.add(boid.velocity);
        count++;
      }
    }

    if (count > 0) {
      velSum.divideScalar(count);

      var l = velSum.length();

      if (l > this._maxSteerForce) {
        velSum.divideScalar(l / this._maxSteerForce);
      }
    }

    return velSum;
  };

  cohesion = (boids: Boid[]) => {
    let boid,
      distance,
      posSum = new THREE.Vector3(),
      steer = new THREE.Vector3(),
      count = 0;

    for (var i = 0, il = boids.length; i < il; i++) {
      if (Math.random() > 0.5) continue;

      boid = boids[i];
      distance = boid.position.distanceTo(this.position);

      if (distance > 0 && distance <= this._neighborhoodRadius) {
        posSum.add(boid.position);
        count++;
      }
    }

    if (count > 0) {
      posSum.divideScalar(count);
    }

    steer.subVectors(posSum, this.position);

    var l = steer.length();

    if (l > this._maxSteerForce) {
      steer.divideScalar(l / this._maxSteerForce);
    }

    return steer;
  };

  separation = (boids: Boid[]) => {
    let boid,
      distance,
      posSum = new THREE.Vector3(),
      repulse = new THREE.Vector3();

    for (var i = 0, il = boids.length; i < il; i++) {
      if (Math.random() > 0.2) continue;

      boid = boids[i];
      distance = boid.position.distanceTo(this.position);

      if (distance > 0 && distance <= this._neighborhoodRadius) {
        repulse.subVectors(this.position, boid.position);
        repulse.normalize();
        repulse.divideScalar(distance);
        posSum.add(repulse);
      }
    }

    return posSum;
  };
}

var SCREEN_WIDTH = window.innerWidth,
  SCREEN_HEIGHT = window.innerHeight,
  SCREEN_WIDTH_HALF = SCREEN_WIDTH / 5,
  SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 5;

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.Renderer,
  birds: THREE.Mesh[],
  bird: THREE.Mesh;

let boid: Boid;
let boids: Boid[];

const init = (domRoot: HTMLDivElement) => {
  camera = new THREE.PerspectiveCamera(
    75,
    SCREEN_WIDTH / SCREEN_HEIGHT,
    1,
    10000,
  );
  camera.position.z = 450;

  scene = new THREE.Scene();

  birds = [];
  boids = [];

  for (var i = 0; i < 20; i++) {
    boid = boids[i] = new Boid();
    boid.position.x = Math.random() * 400 - 200;
    boid.position.y = Math.random() * 400 - 200;
    boid.position.z = Math.random() * 400 - 200;
    boid.velocity.x = Math.random() * 2 - 1;
    boid.velocity.y = Math.random() * 2 - 1;
    boid.velocity.z = Math.random() * 2 - 1;
    boid.setAvoidWalls(true);
    boid.setWorldSize(500, 500, 400);

    bird = birds[i] = new THREE.Mesh(
      new Bird(),
      new THREE.MeshBasicMaterial({
        color: Math.random() * 0x388e3c,
        side: THREE.DoubleSide,
      }),
    );

    // @ts-ignore
    bird.phase = Math.floor(Math.random() * 62.83);

    scene.add(bird);
  }

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  document.addEventListener("mousemove", onDocumentMouseMove, false);
  domRoot.replaceChildren(renderer.domElement);
  window.addEventListener("resize", onWindowResize, false);
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const onDocumentMouseMove = (event: MouseEvent) => {
  let vector = new THREE.Vector3(
    event.clientX - SCREEN_WIDTH_HALF,
    -event.clientY + SCREEN_HEIGHT_HALF,
    0,
  );

  for (let i = 0, il = boids.length; i < il; i++) {
    boid = boids[i];
    boid.setGoal(vector);
    vector.z = boid.position.z;
    boid.repulse(vector);
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  render();
};

const render = () => {
  for (var i = 0, il = birds.length; i < il; i++) {
    boid = boids[i];
    boid.run(boids);

    bird = birds[i];
    bird.position.copy(boids[i].position);

    // color = bird.material.color;
    // color.r = color.g = color.b = (500 - bird.position.z) / 1000;

    bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
    bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());

    // @ts-ignore
    bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.73;

    const birdGeometry = bird.geometry;
    const positions = new Float32Array(
      birdGeometry.getAttribute("position").count * 3,
    );
    birdGeometry.getAttribute("position").array.forEach((value, index) => {
      positions[index] = value;
    });
    // @ts-ignore
    const sinValue = Math.sin(bird.phase) * 5;
    positions[4 * 3 + 1] = positions[5 * 3 + 1] = sinValue;
    birdGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    birdGeometry.attributes.position.needsUpdate = true;
  }

  renderer.render(scene, camera);
};

const Flock = () => {
  const glRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (glRef.current) {
      init(glRef.current);
      animate();
    }
  }, [glRef]);

  return <div ref={glRef} />;
};

export default Flock;
