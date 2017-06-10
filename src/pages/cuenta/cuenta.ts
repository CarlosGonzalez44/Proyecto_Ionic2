import { DatosPage } from './datos';
import { Component, ViewChild  } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';

@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html'
})
export class CuentaPage {

  @ViewChild('content') menu : NavController
  datosPage = DatosPage;

  constructor(public navCtrl: NavController, public menuCtrl:MenuController) {

  }

  moveTo(page){
      this.menu.setRoot(page);
      this.menuCtrl.close();
  }
}
