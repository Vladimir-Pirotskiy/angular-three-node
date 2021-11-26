import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {CubeSettings} from "../../model/cubeSettings";
import * as THREE from "three";
import {CubeParametrsService} from "../../share/cube-parametrs.service";
import {Objects} from "../../share/objects";

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  //* Cube Properties

  @Input() public rotationSpeedX: number = 0;

  @Input() public rotationSpeedY: number = 0;

  @Input() public size: number = 200;

  //* Stage Properties

  @Input() public cameraZ: number = 400;

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPlane: number = 1;

  @Input('farClipping') public farClippingPlane: number = 1000;

  selectedCubeSettings: CubeSettings | undefined;

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  cubeSettings: CubeSettings = {rotationSpeedX: this.rotationSpeedX, rotationSpeedY: this.rotationSpeedY};

  constructor(private cubeParametrsService: CubeParametrsService, private objects: Objects) {
  }

  ngOnInit(): void {
    this.cubeParametrsService.currentSettings.subscribe(value => {
      this.rotationSpeedX = value.rotationSpeedX;
      this.rotationSpeedY = value.rotationSpeedY;
      this.cubeSettings = value;
    });
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }

  @HostListener('document:keydown', ['$event'])
  handleShiftPlusEvent(event: KeyboardEvent) {
    switch (event.key) {
      case '+':
        this.cubeSettings.rotationSpeedX = +(this.rotationSpeedX + 0.01).toFixed(2);
        break;
      case '_':
        this.cubeSettings.rotationSpeedX = +(this.rotationSpeedX - 0.01).toFixed(2);
        break;
      case')':
        this.cubeSettings.rotationSpeedY = +(this.rotationSpeedY + 0.01).toFixed(2);
        break;
      case'(':
        this.cubeSettings.rotationSpeedY = +(this.rotationSpeedY - 0.01).toFixed(2);
        break;
    }
    this.cubeParametrsService.changeSettings(this.cubeSettings);
  }

  private animateCube() {
    this.objects.cube.rotation.x += this.rotationSpeedX;
    this.objects.cube.rotation.y += this.rotationSpeedY;
  }

  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000)
    this.scene.add(this.objects.cube);
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: SceneComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }
}
