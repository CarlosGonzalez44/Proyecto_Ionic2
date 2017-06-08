import { ApiService } from './../../services/api.service';
import { LoginService } from './../../services/login.service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import { ModalController, NavController, NavParams, ViewController,Platform } from 'ionic-angular';

@Component({
  selector: 'page-sala-chat',
  templateUrl: 'sala-chat.html',
})

export class SalaChatPage {

  socket:any
  room;messages;
  rutaFoto = '../../assets/imagenes/1.jpg';
  roomRecharge;
  newMessage;
  users;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,
              private logServ:LoginService,private api:ApiService) 
  {
    this.room = navParams.data;
    //localStorage.clear();
    
  } 


  ionViewWillEnter(){
      
      this.api.setWebSocketConnection(this.logServ.getToken());

      if(localStorage.getItem('allMessages'+this.room.id)==null)
      {
          this.messages=[];
          this.api.emit('getMessages',{"token":this.logServ.getToken(),"idRoom":this.room.id,"lastMessage":-1});
      }
      else{
        
        this.messages = JSON.parse(localStorage.getItem('allMessages'+this.room.id));
        this.api.emit('getMessages',{"token":this.logServ.getToken(),"idRoom":this.room.id,"lastMessage":this.messages[this.messages.length-1].id});
      }

      this.api.getWebSocketConnection().on('getMessages', (msgs) => {

          if(typeof(msgs.BD) != "undefined"){
            this.api.launchMessage("Error",msgs.BD);
            this.api.closeWebsocketConnection();
          }
          else if(typeof(msgs.AUTH) != "undefined"){
            this.api.launchMessage("Error",msgs.AUTH);
            this.api.closeWebsocketConnection();
            this.navCtrl.setRoot(LoginPage); 
          }
          else{
              if(msgs.length >= 1)
              {
                 for(var i=0;i<msgs.length;i++){
                   this.messages.push(msgs[i]);
                   
                 }
                 localStorage.setItem('allMessages'+this.room.id,JSON.stringify(this.messages));
              }
          }  
      });

      this.api.getWebSocketConnection().on('message', (msg) => {
          console.log("al menos llego")
          if(typeof(msg.BD) != "undefined"){
            this.api.launchMessage("Error",msg.BD);
            this.api.closeWebsocketConnection();
          }
          else if(typeof(msg.AUTH) != "undefined"){
            this.api.launchMessage("Error",msg.AUTH);
            this.api.closeWebsocketConnection();
            this.navCtrl.setRoot(LoginPage); 
          }
          else{
            
            this.messages.push(msg[0]);
          }  
      });

  }
  ionViewWillLeave(){
     this.api.closeWebsocketConnection();
  }

  sendMessage(){

    if(this.newMessage != ''){

      var m = {"idUser":this.logServ.getIdentity().sub,
               "idRoom": this.room.id,
               "content":this.newMessage,
               "nameUser": this.logServ.getIdentity().name
              };
      this.api.emit('message',{"token":this.logServ.getToken(),"msg":m});
      
    }
    this.newMessage = "";
  }

  mostrarParticipantes() {

    
    let modal = this.modalCtrl.create(ParticipantesModal,{"room":this.room.id});
    modal.present();
  }

}


@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Participantes
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Volver</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list>
      <ion-item *ngFor="let p of participantes">
        <ion-avatar item-left>
          <img src="{{rutaFoto}}"/>
        </ion-avatar>
        <h2>{{p.name}}</h2>
      </ion-item>
  </ion-list>
</ion-content>
`
})
export class ParticipantesModal {
  participantes;
  idRoom;
  socket:any
  rutaFoto = '../../assets/imagenes/1.jpg';
  constructor(public platform: Platform,public params: NavParams,public viewCtrl: ViewController, public api:ApiService,public logServ:LoginService,public navCtrl:NavController) {

    this.idRoom = this.params.get('room');

  }

  ionViewWillEnter(){
    this.api.setWebSocketConnection(this.logServ.getToken());  
    this.api.emit('members',{"token":this.logServ.getToken(),"idRoom":this.idRoom});
    this.api.getWebSocketConnection().on('members', (data) => {

        if(typeof(data.BD) != "undefined")
        {
            this.api.launchMessage("Error",data.BD);
            this.api.closeWebsocketConnection();
        }
        else if(typeof(data.AUTH) != "undefined"){
            this.api.launchMessage("Error",data.AUTH);
            this.api.closeWebsocketConnection();
            this.navCtrl.setRoot(LoginPage); 
        }
        else{
            this.participantes = data;
        }
    });
  }

  ionViewWillLeave(){
     this.api.closeWebsocketConnection();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}