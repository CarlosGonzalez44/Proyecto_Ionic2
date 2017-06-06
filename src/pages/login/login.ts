import { LoginService } from '../../services/login.service';
import { TabsPage } from './../tabs/tabs';
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

  constructor(public navCtrl: NavController,public alertCtrl:AlertController, private loginService:LoginService) {

  }

  login(formulario:NgForm)
  {
    var user = {
        "username": formulario.value.username,
        "password": formulario.value.password,
        "getHash":  "false"
    }

    this.loginService.signup(user).subscribe(
       response => {
          let identity = response;
          this.identity = identity;

          if(this.identity.length <= 1){
              this.loginService.launchMessage('500','Error en el servidor.');
          }
          else
          {
              if(!this.identity.status){
                  localStorage.setItem('identity', JSON.stringify(identity));
                  //console.log(localStorage.getItem('identity'));
                  user.getHash = "true";

                  // GET TOKEN
                  this.loginService.signup(user).subscribe(
                      response => {
                        let token = response;
                        this.token = token;

                        if(this.token.length <= 0){
                          this.loginService.launchMessage('500','Error en el servidor.');
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
                        this.loginService.launchMessage('500','Error en la peticion.');
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
  }
}
