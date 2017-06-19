import { ApiService } from './../../services/api.service';
import { LoginService } from './../../services/login.service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Usuario } from "../../models/usuario";

@Component({
  selector: 'page-datos',
  templateUrl: 'datos.html'
})
export class DatosPage {
  
  passNew1;passNew2;email;
  user:Usuario;
  aux = '../../assets/imagenes/1.jpg';
  
  constructor(public navCtrl: NavController, public app:App,private logS:LoginService, private api:ApiService) {
     this.user = this.logS.getIdentity();
     this.email = this.user.email;
  }

  logout(){
      localStorage.setItem('identity',null);
      localStorage.setItem('token',null);
      
      this.app.getRootNav().setRoot(LoginPage);
  }
  submitChanges(){
     var flag = false;
     if((typeof(this.passNew1)=="undefined" && typeof(this.passNew2)=="undefined" && typeof(this.email)=="undefined") ||
        (this.passNew1 == "" && this.passNew2 == "" && this.email== ""))
     {
        this.api.launchMessage("Error","No hay cambios que actualizar.");
     }
     else if(typeof(this.passNew1)!="undefined" && typeof(this.passNew2)!="undefined")
     {
            if(this.passNew1.localeCompare(this.passNew2)!=0){
              
              this.api.launchMessage("Error","Ambas contraseñas deben coincidir.");
            }
            else{
               flag = true;
            }
     }
     else{
         flag = true;
     }
     if(flag == true){
       var S = this;
        this.api.sendPerfilChanges(this.passNew1,this.passNew2,this.email,function(data){
           console.log(data);
           S.api.launchMessage("Exito","Cambios realizados correctamente.");
           S.passNew1= "";S.passNew2= "";

        });
     }
     
  }
}
