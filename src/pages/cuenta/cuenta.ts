import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html'
})
export class CuentaPage {


  constructor(public navCtrl: NavController) {

  }
  ngOnInit(){
    console.log(localStorage.getItem('token'));
  }
  logout(){
      localStorage.setItem('identity',null);
      localStorage.setItem('token',null);
      this.navCtrl.setRoot(LoginPage);
  }
}
