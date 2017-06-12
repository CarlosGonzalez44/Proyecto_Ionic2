import { Sala } from './../models/sala';
import { Noticia } from '../models/noticia';
import { LoginService } from './login.service';
import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as io from 'socket.io-client';
import { Categoria } from "../models/categoria";
import { Mensaje } from "../models/mensaje";
import { Usuario } from "../models/usuario";

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

	getNewsAndCategorys(category,callback){
		var token = this.logServ.getToken();

        var arrayNews = new Array<Noticia>();
        var arrayCategorys = new Array<Categoria>();
        var result;

        this.http.get(this.url+"/noticiasapp/"+token+"/"+category ,{headers : this.headers}).subscribe(
            
                response => {
                    if(response.json().status)
                    {
                        this.launchMessage(response.json().status,response.json().data);
                        result = false;
                    }
                    else
                    {
                        var news = response.json()[0];
                        for(var i=0;i<news.length;i++)
                        {
                            var n = new Noticia();

                            n.id = news[i].id;
                            n.name = news[i].name;
                            n.description = news[i].description;
                            n.author = news[i].author;
                            n.date = news[i].date.date;
                            n.category = new Categoria(news[i].category.id,news[i].category.name);

                            arrayNews.push(n);
                        }
                        var categorys = response.json()[1];
                        for(var i=0;i<categorys.length;i++){
                            arrayCategorys.push(new Categoria(categorys[i].id,categorys[i].name));
                        }
                        result = [arrayNews,arrayCategorys]
                        
                    }
                    return callback(result);
                },
                error => {
                    this.launchMessage('500',error);
                }
          );		
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
    
    onWebSocket(channel,callback){
        var result = null;
        this.socket.on(channel, (data) => {

         if(typeof(data.BD) != "undefined"){
            this.launchMessage("Error",data.BD);
            this.closeWebsocketConnection();
          }
          else if(typeof(data.AUTH) != "undefined"){
            this.launchMessage("Error",data.AUTH);
            this.closeWebsocketConnection();
            this.logServ.logout();
            result = false;
          }
          else{
              console.log(data);
              var array=[];
              if(data.length >=1 )
              {
                 for(var i=0;i<data.length;i++)
                 {
                    if(channel.localeCompare('room')==0)
                    {
                        array.push(new Sala(data[i].id,data[i].title,data[i].description,data[i].year,data[i].author));
                    }
                    else if(channel.localeCompare('getMessages')==0 || channel.localeCompare('message')==0)
                    {
                        array.push(new Mensaje(data[i].id,data[i].author,data[i].content,data[i].date));
                    }
                    else if(channel.localeCompare('members')==0){
                        var u = new Usuario();
                        u.id = data[i].id;
                        u.name = data[i].name;
                        u.username = data[i].username;
                        u.information = data[i].information;
                        array.push(u);
                    }
                    else{
                        console.log('no funciona, algo pasa con las peticiones al node')
                        console.log('https://www.youtube.com/watch?v=oZ_PZrw2dX8')
                    } 
                }
                result = array;
              }
          }  
          return callback(result)
      });
      
    }

    sendPerfilChanges(pass1,pass2,email,callback){
      

      var datos = {
          "token" : this.logServ.getToken(),
          "pass1" : pass1,
          "pass2": pass2,
          "email": email
      }

      let json = JSON.stringify(datos);
      let params = "json="+json;

      //return this.http.post(this.url+"/changesperfilapp",params,{headers : this.headers}).map(res => res.json());
      this.http.post(this.url+"/changesperfilapp",params,{headers : this.headers}).map(res => res.json()).subscribe(
          response => {
              return callback(response);
          },
          error => {
            return callback(error);
          }
        );;
    }
}
