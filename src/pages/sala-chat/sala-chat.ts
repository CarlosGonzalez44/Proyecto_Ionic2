import { Usuario } from '../../models/usuario';
import { Mensaje } from '../../models/mensaje';
import { ApiService } from './../../services/api.service';
import { LoginService } from './../../services/login.service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { ModalController, Platform, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { Sala } from "../../models/Sala";

@Component({
  selector: 'page-sala-chat',
  templateUrl: 'sala-chat.html',
})

export class SalaChatPage {

  room:Sala;
  messages:Array<Mensaje>;
  rutaFoto = '../../assets/imagenes/1.jpg';
  roomRecharge;
  newMessage;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,
              private logServ:LoginService,private api:ApiService,private app:App) 
  {
    this.room = navParams.data;
    //localStorage.clear();
    
  } 


  ionViewWillEnter(){
      var S = this;
      this.api.setWebSocketConnection(this.logServ.getToken());
      this.api.emit('room',this.logServ.getToken());
      if(localStorage.getItem('allMessages'+this.room.id)==null)
      {
          this.messages=[];
          this.api.emit('getMessages',{"token":this.logServ.getToken(),"idRoom":this.room.id,"lastMessage":-1});
      }
      else{
        
        this.messages = JSON.parse(localStorage.getItem('allMessages'+this.room.id));
        this.api.emit('getMessages',{"token":this.logServ.getToken(),
                                     "idRoom":this.room.id,
                                     "lastMessage":this.messages[this.messages.length-1].id});
      }

      this.api.onWebSocket('getMessages',function(data){
         console.log(data);
         if(data == false)
         {
            S.app.getRootNav().setRoot(LoginPage);
         }
         else
         {
           if(data.length >= 1){
               for(var i=0;i<data.length;i++)
               {
                   S.messages.push(data[i]);
               }
               localStorage.setItem('allMessages'+S.room.id,JSON.stringify(S.messages));
           }
         }
      });

       this.api.onWebSocket('message',function(data){
         console.log(data);
         if(data == false)
         {
            S.app.getRootNav().setRoot(LoginPage);
         }
         else
         {
            S.messages.push(data[0]);
            localStorage.setItem('allMessages'+S.room.id,JSON.stringify(S.messages));
         }
      });

  }
  ionViewWillLeave(){
     this.api.closeWebsocketConnection();
  }

  sendMessage(){

    if(this.newMessage != ''){
      console.log(this.logServ.getIdentity())
      console.log(this.room.id)
      var m = {"idUser":this.logServ.getIdentity().id,
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
          <img *ngIf="p.id==1" src="../../assets/imagenes/1p.png" />
          <img *ngIf="p.id%2 == 0 && p.id!=1 " src="../../assets/imagenes/2p.jpg" />
          <img *ngIf="p.id%2 != 0 && p.id!=1 " src="../../assets/imagenes/3p.png" />
        </ion-avatar>
        <h2>{{p.name}}</h2>
      </ion-item>
  </ion-list>
</ion-content>
`
})
export class ParticipantesModal {
  participantes:Array<Usuario>;
  idRoom;
  rutaFoto = '../../assets/imagenes/1.jpg';
  constructor(public platform: Platform,public params: NavParams,public viewCtrl: ViewController, public api:ApiService,
              public logServ:LoginService,public navCtrl:NavController, private app:App) {

    this.idRoom = this.params.get('room');

  }

  ionViewWillEnter(){
    var S = this;
    //this.api.setWebSocketConnection(this.logServ.getToken());  
    this.api.emit('members',{"token":this.logServ.getToken(),"idRoom":this.idRoom});

    this.api.onWebSocket('members',function(data){
         console.log(data);
         if(data == false)
         {
            S.app.getRootNav().setRoot(LoginPage);
         }
         else
         {
            S.participantes = data;
         }
     });
  }

  ionViewWillLeave(){
     //this.api.closeWebsocketConnection();
  }

  dismiss() {
    //this.api.closeWebsocketConnection();
    this.viewCtrl.dismiss();
  }
}