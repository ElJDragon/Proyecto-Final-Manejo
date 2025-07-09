import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Misionvision } from '../../models/misionvision';
import { MisionService } from '../../services/mision.service';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers: [MisionService]
})
export class DefaultComponent {
  public misionvision: Misionvision;
  public misionp: any;
  public status: any;

  constructor(
    private _misionvisionService: MisionService
  ) {
  }

  ngOnInit() {
    this.getMision();
  }

  getMision() {
    this._misionvisionService.getMision().subscribe(
      response => {
        if (response.status == "OK") {
          this.misionp = response.tipos;
        } else {
          this.status = 'error1';
        }
      },
      error => {
        this.status = 'error1';
        console.log(<any>error);
      }
    );
  }
}
