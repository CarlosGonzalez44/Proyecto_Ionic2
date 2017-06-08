import { LoginPage } from './../login/login';
import { LoginService } from './../../services/login.service';
import { ApiService } from './../../services/api.service';
import { SalaChatModule } from './../sala-chat/sala-chat.module';
import { Component } from '@angular/core';
import { SalaChatPage } from '../sala-chat/sala-chat';
import { NavController, NavParams } from 'ionic-angular';
import * as io from 'socket.io-client';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {

  socket:any
  salaPage = SalaChatPage;
  aux = '../../assets/imagenes/1.jpg';
  rooms;
  roomRecharge;

  constructor(public navCtrl: NavController,public navParams: NavParams,private logServ:LoginService, private api:ApiService) {
        

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
            this.navCtrl.setRoot(LoginPage); 
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
