import { LoginService } from './../../services/login.service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html'
})
export class CuentaPage {

  user;
  aux = '../../assets/imagenes/1.jpg';
  
  constructor(public navCtrl: NavController, public app:App,public logS:LoginService) {
     this.user = this.logS.getIdentity();
  }

  logout(){
      localStorage.setItem('identity',null);
      localStorage.setItem('token',null);
      
      this.app.getRootNav().setRoot(LoginPage);

  }
}
