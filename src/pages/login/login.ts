import { LoginService } from '../../services/login.service';
import { TabsPage } from './../tabs/tabs';
import { Global } from './../../app/global';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public errorMessage;
  public identity;
  public token;

  constructor(public navCtrl: NavController,public alertCtrl:AlertController, private _loginService:LoginService) {

  }

  login(formulario:NgForm)
  {
    var user = {
        "username": formulario.value.username,
        "password": formulario.value.password,
        "getHash":  "false"
    }

    this._loginService.signup(user).subscribe(
       response => {
          let identity = response;
          this.identity = identity;

          if(this.identity.length <= 1){
              alert("Error en el servidor")
          }
          else
          {
              if(!this.identity.status){
                  localStorage.setItem('identity', JSON.stringify(identity));
                  //console.log(localStorage.getItem('identity'));
                  user.getHash = "true";

                  // GET TOKEN
                  this._loginService.signup(user).subscribe(
                      response => {
                        let token = response;
                        this.token = token;

                        if(this.token.length <= 0){
                          alert("Error en el servidor");
                        }else{
                          if(!this.token.status){
                            localStorage.setItem('token', token);
                            this.navCtrl.setRoot(TabsPage);
                          }
                        }
                      },
                      error => {
                      this.errorMessage = <any>error;

                      if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                      }
                    }

                  );

              }
          }

       },
       error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la peticion");
          }
       }
    );
    /*if(Global.usuario === formulario.value.username && Global.password === formulario.value.clave)
    {
      this.navCtrl.setRoot(TabsPage);
    }
    else
    {
      let alerta = this.alertCtrl.create({
        message: "Acceso denegado, usuario o contraseña incorrectos.",
        buttons: ["Cerrar"]
      });
      alerta.present();
    } */
  }
}
