import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10,1,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

//////////////////////////////////////////////////////////////////////////////////////////////////////

function addStar(){

  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  // const geometry2 = new THREE.CubicBezierCurve3(0.25, 24, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space-texture.jpg');
// const spaceTexture = new THREE.TextureLoader().load('sky.jpg');
scene.background = spaceTexture;

//Avatar
const fidiasTexture = new THREE.TextureLoader().load('fidias.jpg');
const fidias = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: fidiasTexture})
);

scene.add(fidias);

//Ground
const sqTexture = new THREE.TextureLoader().load('ground.jpg');
const ground = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:sqTexture})
);

scene.add(ground);

//Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon);

const jupeterTexture = new THREE.TextureLoader().load('jupe.jpg');

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(10,32,32),
  new THREE.MeshStandardMaterial({
    map: jupeterTexture,
  })
);

scene.add(jupiter);

moon.position.z = 12;
moon.position.setX(-5);

jupiter.position.z = 30;
jupiter.position.setX(-20);

fidias.position.z = -5;
fidias.position.y = 0;
fidias.position.x = 3;
// fidias.position.setX(0);

ground.position.z = 8;
ground.position.y = 4;
ground.position.x = 6;

torus.position.z = -5;

//Funcion para mover con el scroll

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // jupiter.rotation.x += 0.03;
  jupiter.rotation.y += 0.055;
  // jupiter.rotation.z += 0.03;

  fidias.rotation.y += 0.05;
  fidias.rotation.z += 0.07;

  ground.rotation.y += 0.05;
  ground.rotation.z += 0.07;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

//Animacion de elementos
function animate(){
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  fidias.rotation.y += 0.005;
  fidias.rotation.z += 0.005;
  fidias.rotation.x += 0.005;

  moon.rotation.z += 0.009;

  jupiter.rotation.x += 0.009;

  ground.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();
//////////////////////////////////////////////////////////////Nuevo objeto 3D en la pantalla
