import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import Scene = THREE.Scene;
import Mesh = THREE.Mesh;
import Camera = THREE.Camera;

@Component({
  selector: 'app-solar-system',
  templateUrl: 'solar-system.component.html',
  styleUrls: ['./solar-system.component.css']
})
export class SolarSystemComponent implements AfterViewInit{
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  private renderer = new THREE.WebGLRenderer;
  private scene:Scene;
  private camera:Camera;
  private mesh:Mesh;
  private controls:any = null;
  private textureLoader = new THREE.TextureLoader();
  private sunSurface = new THREE.MeshStandardMaterial({color:0xaaaaaa});

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.set(0, 10, 100);

    this.scene.add(new THREE.AmbientLight(0xFFFFFF, 1.5));

    const geometry = new THREE.SphereGeometry( 15, 32, 16 );

    this.sunSurface.map = this.textureLoader.load('./assets/2k_sun.jpg');

    this.mesh = new THREE.Mesh(geometry, this.sunSurface);

    this.scene.add(this.mesh);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  ngAfterViewInit(): void{
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate(): void{
    window.requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

}
