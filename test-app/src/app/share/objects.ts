import {Injectable} from "@angular/core";
import * as THREE from "three";


@Injectable({
  providedIn: 'root'
})
export class Objects {

  public texture: string = "/assets/texture.jpg";

  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshBasicMaterial({map: this.loader.load(this.texture)});

  public cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  constructor() {}


}
