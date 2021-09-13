import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';



@Component({
  selector: 'app-solar-system',
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.css']
})
export class SolarSystemComponent implements AfterViewInit{
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  private renderer = new THREE.WebGLRenderer;
  private scene:any = null;
  private camera:any = null;
  private mesh:any = null;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    this.mesh = new THREE.Mesh(geometry, material);

    this.scene.add(this.mesh);
  }

  ngAfterViewInit(): void{
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate(): void{
    window.requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
  }

}
