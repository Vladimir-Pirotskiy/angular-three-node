import {Injectable, Input} from "@angular/core";
import * as THREE from "three";
import {CubeParametrsService} from "./cube-parametrs.service";
import {CubeSettings} from "../model/cubeSettings";


@Injectable({
  providedIn: 'root'
})
export class Objects {

  public texture: string = "/assets/texture.jpg";

  @Input() public rotationSpeedX: number = 0;

  @Input() public rotationSpeedY: number = 0;

  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshBasicMaterial({map: this.loader.load(this.texture)});

  public cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  cubeSettings: CubeSettings = {rotationSpeedX: this.rotationSpeedX, rotationSpeedY: this.rotationSpeedY};


  constructor(private cubeParametersService: CubeParametrsService) {
    this.cubeParametersService.currentSettings.subscribe(value => {
      this.rotationSpeedX = value.rotationSpeedX;
      this.rotationSpeedY = value.rotationSpeedY;
      this.cubeSettings = value;
    });
  }

  public animateCube(rotationSpeedX: number, rotationSpeedY: number) {
    this.cube.rotation.x += rotationSpeedX;
    this.cube.rotation.y += rotationSpeedY;
  }

  public changeCubeSettings() {
    this.cubeParametersService.changeSettings(this.cubeSettings);
  }

  public onKeyChangeRotationSpeedXY(event: KeyboardEvent) {
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
  }


}
