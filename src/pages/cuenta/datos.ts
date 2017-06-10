import { ApiService } from './../../services/api.service';
import { LoginService } from './../../services/login.service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

@Component({
  selector: 'page-datos',
  templateUrl: 'datos.html'
})
export class DatosPage {
  
  passNew1;passNew2;email;
  user;
  aux = '../../assets/imagenes/1.jpg';
  
  constructor(public navCtrl: NavController, public app:App,private logS:LoginService, private api:ApiService) {
     this.user = this.logS.getIdentity();
  }

  logout(){
      localStorage.setItem('identity',null);
      localStorage.setItem('token',null);
      
      this.app.getRootNav().setRoot(LoginPage);
  }
  submitChanges(){
     if(typeof(this.passNew1)=="undefined" && typeof(this.passNew2)=="undefined" && typeof(this.email)=="undefined"){
        this.api.launchMessage("Error","No hay cambios que actualizar.");
     }
     else if(typeof(this.passNew1)!="undefined" && typeof(this.passNew2)!="undefined"){
       
        if(this.passNew1.localeCompare(this.passNew2)!=0){
          
          this.api.launchMessage("Error","Ambas contraseñas deben coincidir.")
        }
     }
     else{
        this.api.sendPerfilChanges(this.passNew1,this.passNew2,this.email).subscribe(
          response => {
              console.log(response);
          },
          error => {
            console.log(error);
          }
        );
     }
     
  }
}
