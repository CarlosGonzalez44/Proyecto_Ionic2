import { LoginPage } from './../login/login';
import { LoginService } from './../../services/login.service';
import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';
import { SalaChatPage } from '../sala-chat/sala-chat';
import { NavController, NavParams, App } from 'ionic-angular';
import { Sala } from "../../models/Sala";

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {

  salaPage = SalaChatPage;
  aux = '../../assets/imagenes/1.jpg';
  rooms:Array<Sala>;

  constructor(public navCtrl: NavController,public navParams: NavParams,private logServ:LoginService, private api:ApiService,private app:App) {
        

  }
  
  ionViewWillEnter(){
     var S = this;
     this.api.setWebSocketConnection(this.logServ.getToken());
     this.api.emit('room',this.logServ.getToken());
     /*this.api.getWebSocketConnection().on('room', (rooms) => {

         if(typeof(rooms.BD) != "undefined"){
            this.api.launchMessage("Error",rooms.BD);
            this.api.closeWebsocketConnection();
          }
          else if(typeof(rooms.AUTH) != "undefined"){
            this.api.launchMessage("Error",rooms.AUTH);
            this.api.closeWebsocketConnection();
            this.logServ.logout();
            this.app.getRootNav().setRoot(LoginPage);
          }
          else{
             this.rooms = rooms;
          }  
          
      });*/
      this.api.onWebSocket('room',function(data){
         console.log(data);
         if(data == false)
         {
            S.app.getRootNav().setRoot(LoginPage);
         }
         else
         {
            S.rooms = data;
         }
      });
      
      
  }
  ionViewWillLeave(){
    
    this.api.closeWebsocketConnection();

  }
}
