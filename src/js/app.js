import * as THREE from 'three';

import fragment from './fragment.glsl';
import vertex from './vertex.glsl';
import * as dat from 'dat.gui';


import { TimelineMax } from 'gsap';
let OrbitControls = require('three-orbit-controls')(THREE);


export default class Sketch {
  constructor(selector) {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xeeeeee, 1);

    this.container = document.getElementById('container');
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );


    this.camera.position.set(0, 0, 2);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;

    this.paused = false;



    this.setupResize();
    this.addObjects();
    this.resize();
    // this.settings();
  }

  settings() {
    let that = this;
    this.settings = {
      time: 0,
    };

    this.gui = new dat.GUI();
    this.gui.add(this.settings, 'time', 0, 100, 0.01);
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;


    //image cover
    // this.imageAspect = 853 / 1280;
    // let a1;
    // let a2;
    // if| (this.height / this.width > this.imageAspect) {
    //   a1 = (this.width / this.height) * this.imageAspect;
    //   a2 = 1;
    // } else {
    //   a1 = 1;
    //   a2 = (this.width / this.height) * this.imageAspect;
    // }


    // this.material.uniforms.resolution.value.x = this.width;
    // this.material.uniforms.resolution.value.y = this.height;
    // this.material.uniforms.resolution.value.z = a1;
    // this.material.uniforms.resolution.value.w = a2;


    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    let that = this;
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives: enable'
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: {
          type: 'f', value: 0
        },
        resolution: {
          type: 'v4', value: new THREE.Vector4()
        },
        uvRate1: {
          value: new THREE.Vector2(1, 1)
        }
      },
      // wireframe: true,
      // transparent: true,

      vertexShader: vertex,
      fragmentShader: fragment
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.geometry = new THREE.OctahedronBufferGeometry(1);
    // this.geometry = new THREE.OctahedronBoxBufferGeometry(1);

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  stop() {
    this.paused = true;
  }

  play() {
    this.paused = false;
    this.render();
  }

  render() {
    renderer.render(scene, camera);
  }
}

new Sketch('container');




// let camera, pos, controls, scene, renderer, geometry, geometry1, material, plane, tex1, tex2;
// let destination = { x: 0, y: 0 };
// let textures = [];

// function init() {
//   scene = new THREE.Scene();

//   renderer = new THREE.WebGLRenderer();

//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerWidth);

//   var container = document.getElementById('container');
//   container.appendChild(renderer.domElement);

//   camera = new THREE.PerspectiveCamera(
//     70,
//     window.innerWidth / window.innerHeight,
//     0.001, 100
//   );
//   camera.position.set(0, 0, 1);


//   controls = new OrbitControls(camera, renderer.domElement);


//   material = new THREE.ShaderMaterial({
//     side: THREE.DoubleSide,
//     uniforms: {
//       time: { type: 'f', value: 0 }
//     },
//     // wireframe: true,
//     vertexShader: vertex,
//     fragmentShader: fragment,
//   });

//   plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 64, 64), material);
//   scene.add(plane);

//   resize();


// }

// window.addEventListener('resize', resize);
// function resize() {
//   var w = window.innerWidth;
//   var h = window.innerHeight;
//   renderer.setSize(w, h);
//   camera.aspect = w / h;
//   camera.updateProjectionMatrix();
// }

// let time = 0;
// function animate() {
//   time = time + 0.05;
//   material.uniforms.time.value = time;

//   requestAnimationFrame(animate);
//   render();
// }

// function render() {
//   renderer.render(scene, camera);
// }


// init();
// animate();

