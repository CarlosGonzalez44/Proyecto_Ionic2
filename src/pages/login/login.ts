
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
    var user = {
        "username": formulario.value.username,
        "password": formulario.value.password,
        "getHash":  "false"
    }
    //mediante esta peticion obtendre el usuario en plano para almacenarlo en local
    this.loginService.signup(user).subscribe(
       response => {

          if(response.length <= 1){
              this.loginService.launchMessage('Error','Error en el servidor.');
          }
          else
          {
              if(!response.status){
                  localStorage.setItem('identity', JSON.stringify(response));
                  user.getHash = "true";

                  // Ahora hacemos otra peticion para obtener el token del usuario y almacenarlo igualmente
                  this.loginService.signup(user).subscribe(
                      response => {

                        if(response.length <= 0){
                          this.loginService.launchMessage('Error','Error en el servidor.');
                        }else{
                          if(!response.status){
                            localStorage.setItem('token', response);
                            this.navCtrl.setRoot(TabsPage);
                          }
                        }
                      },
                      error => {
                      if(error != null){
                        this.loginService.launchMessage('Error','Error en la peticion.');
                      }
                    });
              }
          }
       },
       error => {
          if(error != null){
            this.loginService.launchMessage('Error','Error en la peticion.');
          }
       });
  }
}
