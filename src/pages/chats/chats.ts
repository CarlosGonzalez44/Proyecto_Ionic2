import { LoginPage } from './../login/login';
import { LoginService } from './../../services/login.service';
import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';
import { SalaChatPage } from '../sala-chat/sala-chat';
import { NavController, NavParams, App } from 'ionic-angular';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {

  salaPage = SalaChatPage;
  aux = '../../assets/imagenes/1.jpg';
  rooms;

  constructor(public navCtrl: NavController,public navParams: NavParams,private logServ:LoginService, private api:ApiService,private app:App) {
        

  }
  
  ionViewWillEnter(){

     this.api.setWebSocketConnection(this.logServ.getToken());
     this.api.emit('room',this.logServ.getToken());
     this.api.getWebSocketConnection().on('room', (rooms) => {

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
          
      });
  }
  ionViewWillLeave(){
    
    this.api.closeWebsocketConnection();

  }
}
