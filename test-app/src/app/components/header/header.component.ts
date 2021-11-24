import {Component, OnInit} from '@angular/core';
import {CubeParametrsService} from "../../share/cube-parametrs.service";
import {CubeSettings} from "../../model/cubeSettings";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    })
  };

  cubeSettings: CubeSettings = {
    rotationSpeedX: 0,
    rotationSpeedY: 0
  }

  constructor(private cubeParametrsService: CubeParametrsService, private http: HttpClient) {
    cubeParametrsService.currentSettings.subscribe(value => {
      this.cubeSettings.rotationSpeedX = value.rotationSpeedX;
      this.cubeSettings.rotationSpeedY = value.rotationSpeedY;
    });
  }

  ngOnInit(): void {}

  upDate(){
    this.cubeParametrsService.changeSettings(this.cubeSettings);
  }

  onLoadState() {
    this.http.get('http://localhost:3000/api/load-state').subscribe((data: any) => {
      this.cubeSettings.rotationSpeedX = data.rotationSpeedX;
      this.cubeSettings.rotationSpeedY = data.rotationSpeedY;
      this.cubeParametrsService.changeSettings(this.cubeSettings);
    });
  }

  onSaveState() {
    this.http.post('http://localhost:3000/api/save-state', this.cubeSettings, this.httpOptions).subscribe(data => console.log(data))
  }
}
