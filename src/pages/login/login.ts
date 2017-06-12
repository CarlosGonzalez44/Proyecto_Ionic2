
import { LoginService } from '../../services/login.service';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, private loginService:LoginService) {

  }


  login(formulario:NgForm)
  {
    var S = this;
    var user = {
        "username": formulario.value.username,
        "password": formulario.value.password,
        "getHash":  "false"
    }
    //obtenemos y almacenamos los datos del usuario en local
    this.loginService.signup(user,false,function(data){
       console.log(data);
       console.log(S.loginService.getIdentity());
      
       if(data==true){
          user.getHash = "true";
          //obtenemos y almacenamos el token del usuario en local
          S.loginService.signup(user,true,function(data){
              console.log(data);
              console.log(S.loginService.getToken());
              if(data==true){
                S.navCtrl.setRoot(TabsPage);
              }
          });
       }
       else{
           S.loginService.launchMessage("Error","Usuario o contraseña incorrectos.");
       }
    });
  }
}
