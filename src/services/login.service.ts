import { Usuario } from '../models/usuario';
import { AlertController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {

	private url = "http://192.168.19.173/app_dev.php";
    //private url = "http://192.168.19.173/depinfo/web/app_dev.php";
    private identity = new Usuario();
	private token;

    constructor(private http: Http,private alertCtrl: AlertController){
		
    }

	launchMessage(title,message){
		let alert = this.alertCtrl.create({
               title: title,
               message: message,
               buttons: ['Volver']
         });
         alert.present();
	}

	logout(){
	  localStorage.setItem('identity',null);
      localStorage.setItem('token',null);
	}
	//la variable token nos indica si queremos obtener los datos del usuario o su token
	signup(user_to_login,token,callback){
      let json = JSON.stringify(user_to_login);
      let params = "json="+json;
      let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
	  var result = false;
      this.http.post(this.url+"/loginapp",params,{headers : headers}).map(res => res.json()).subscribe(
		 response => {

			if(response.length <= 1){
				this.launchMessage('Error','Error en el servidor.');
			}
			else
			{
				if(!response.status){
					if(token == true){
						localStorage.setItem('token', response);
						result = true;
					}
					else{
						var u = new Usuario();
						u.id = response.sub;
						u.name = response.name;
						u.surname = response.surname;
						u.username = response.username;
						u.email = response.email;
						u.password = response.password;
						u.information = response.information;
						localStorage.setItem('identity', JSON.stringify(u));
						result = true;
					}
				}
			}
			return callback(result);
		},
		error => {
			if(error != null){
				this.launchMessage('Error',error);
			}
		});	
    }

  	//mediante esta funcion transformamos de string a objecto la identidad del usuario
	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity != null){

			this.identity = identity;

		}else{
			this.identity = null;
		}

		return this.identity;
	}
	// mediante esta funcion recojemos el token de localstorage
	getToken(){
		let token = localStorage.getItem('token');

		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}

	validateUser(){
		var valid=false;
		if(this.getToken()!=null){
			valid=true;
		}
		return valid;
	}

}
