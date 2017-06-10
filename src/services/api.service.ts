import { LoginService } from './login.service';
import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as io from 'socket.io-client';

@Injectable()
export class ApiService {

    private url = "http://localhost/depinfo/web/app_dev.php";
	private headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    private socket:any;

    constructor(private http: Http,private logServ:LoginService,private alertCtrl: AlertController){

    }
    launchMessage(title,message){
		let alert = this.alertCtrl.create({
               title: title,
               message: message,
               buttons: ['Volver']
         });
         alert.present();
	}

	getNewsAndCategorys(){
		var token = this.logServ.getToken();

		return this.http.get(this.url+"/noticiasapp/"+token ,{headers : this.headers})		
	}

    setWebSocketConnection(token){
        this.socket = io('http://localhost:3000',{query: "token="+token});
    }
    getWebSocketConnection(){
        return this.socket;
    }
    closeWebsocketConnection(){
        this.socket.emit('close');
    }
    emit(channel,parameters){
        this.socket.emit(channel,parameters)
    }

    sendPerfilChanges(pass1,pass2,email){
      

      var datos = {
          "token" : this.logServ.getToken(),
          "pass1" : pass1,
          "pass2": pass2,
          "email": email
      }

      let json = JSON.stringify(datos);
      let params = "json="+json;

      return this.http.post(this.url+"/changesperfilapp",params,{headers : this.headers}).map(
        res => res.json()
        );
    }

    /* Estas funciones fueron creadas para el chat con ajax, actualmente en desuso
    getRooms(){
		var token = this.logServ.getToken();

		return this.http.get(this.url+"/salasapp/"+token ,{headers : this.headers})		
	}
    getMessages(idRoom){
		var token = this.logServ.getToken();

		return this.http.get(this.url+"/salasapp/"+token+"/"+idRoom ,{headers : this.headers})		
	}
    sendMessage(message,idRoom){
      var token = this.logServ.getToken();

      var datos = {
          "token" : this.logServ.getToken(),
          "content": message,
          "idRoom": idRoom
      }

      let json = JSON.stringify(datos);
      let params = "json="+json;

      return this.http.post(this.url+"/messageapp",params,{headers : this.headers}).map(
        res => res.json()
        );
    }*/

}
