import * as THREE from "three";

let scene, camera, renderer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  140,
  window.innerWidth / window.innerHeight,
  0.0001,
  10000
);
camera.position.set(0, 0, 40);
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const handleResize = () => {
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerWidth;
  camera.updateProjectionMatrix();
};

const createSphere = (r = 1, color = 0xffffff) => {
  const sphereGeo = new THREE.SphereGeometry(r, 32, 32);
  const sphereMat = new THREE.MeshPhongMaterial({
    color,
    shininess: 30,
  });
  return new THREE.Mesh(sphereGeo, sphereMat);
};

const createPointLight = (i = 0, color = 0xffffff) => {
  return new THREE.PointLight(color, i);
};

const nucleus = createSphere(2);
const l1 = createPointLight(0.8);
const l2 = createPointLight(0.4);
l1.position.set(60, 20, 60);
l2.position.set(-30, 0, 20);

scene.add(nucleus, l2);
nucleus.add(l1);

const createElectron = (r = 0.4, color = 0xffffff) => {
  const sphere = createSphere(r, color);
  const pivot = new THREE.Object3D();
  pivot.add(sphere);
  return {
    sphere,
    pivot,
  };
};

const createElectrons = (n = 10, space = 4) => {
  const electrons = [];

  for (let i = 0; i < n; i++) {
    electrons.push(createElectron(0.1));
    const nucleusRadius = nucleus.geometry.parameters.radius;
    if (i < n / 2) {
      electrons[i].sphere.position.set((i + 1) * space + nucleusRadius, 0, 0);
    } else {
      electrons[i].sphere.position.set((n - i) * -space - nucleusRadius, 0, 0);
    }
  }
  return electrons;
};

const electrons = createElectrons(600, 0.2);
electrons.forEach((e) => nucleus.add(e.pivot));
electrons.forEach((e, index) => {
  if (index < electrons.length / 2) {
    e.pivot.rotation.y = index * 20;
  } else {
    e.pivot.rotation.y = (electrons.length - index - 1) * 20;
  }
});

const loop = () => {
  electrons.forEach((e) => (e.pivot.rotation.z += 0.01));
  nucleus.rotation.z += 0.01;
  // nucleus.rotation.x -= 0.02;
  // nucleus.rotation.y += 0.03;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};

loop();
window.addEventListener("resize", handleResize);
