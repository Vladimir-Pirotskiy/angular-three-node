import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {CubeSettings} from "../model/cubeSettings";

@Injectable({
  providedIn: 'root'
})
export class CubeParametrsService {
  public subject = new Subject<CubeSettings>();
  public settingsSource = new BehaviorSubject<CubeSettings>({
    rotationSpeedX:  0.05,
    rotationSpeedY: 0.01,
  });
  currentSettings = this.settingsSource.asObservable();

  changeSettings(cubeSettings: CubeSettings) {
    this.settingsSource.next(cubeSettings)
  }

  constructor() {}
}
