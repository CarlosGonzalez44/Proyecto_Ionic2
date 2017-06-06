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

    this.socket = io('http://localhost:3000');
    this.socket.emit('initialCharge', this.room.id,this.logServ.getToken());    
    this.socket.on('initialCharge', (all) => {

        if(typeof(all.Error) != "undefined"){
            this.api.launchMessage("Error",all.Error);
        }
        else{
            this.messages = all.messages;
            this.users = all.users;
        }
    });

    this.socket.on('message', (msg) => {

      if(typeof(msg.Error) != "undefined"){
         this.api.launchMessage("Error",msg.Error);
      }
      else{
        if(typeof(this.messages) == "undefined"){
          this.messages = [];
        }
        this.messages.push(msg);
      }
    });

  } 
  /*ngOnInit(){
     this.getMessages();
  }

  ionViewWillEnter(){
      let S = this;
      this.roomRecharge=setInterval(function(){
         S.getMessages();
      },4000);
  }
  ionViewWillLeave(){
    clearInterval(this.roomRecharge);
  }

  getMessages(){
      console.log("peticionS")
      if(this.logServ.validateUser())
      {
         this.api.getMessages(this.room.id).subscribe(
            
                response => {
                    if(response.json().status)
                    {
                        this.api.launchMessage(response.json().status,response.json().data);
                        this.navCtrl.setRoot(LoginPage);
                    }
                    else
                    {
                        this.messages = response.json();
                    }
                },
                error => {
                    this.api.launchMessage('500',error);
                }
          );
      }
      else
      {
          this.api.launchMessage('Error de autenticación','Debes estar logeado para acceder a esta página.');
          this.navCtrl.setRoot(LoginPage); 
      }
      
  }
  */
  sendMessage(){

    /*this.api.sendMessage(this.newMessage,this.room.id).subscribe(
       response => {
          console.log(response);
       },
       error => {
         console.log(error);
       }
    );*/
    if(this.newMessage != ''){

      var m = {"idUser":this.logServ.getIdentity().sub,
               "idRoom": this.room.id,
               "content":this.newMessage,
               "nameUser": this.logServ.getIdentity().name
              };
      this.socket.emit('message', m,this.logServ.getToken());
    }
    this.newMessage = "";
  }

  mostrarParticipantes() {

    let modal = this.modalCtrl.create(ParticipantesModal,{"participantes":this.users});
    //let modal = this.modalCtrl.create(ParticipantesModal,{"participantes":this.room.users});
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
  rutaFoto = '../../assets/imagenes/1.jpg';
  constructor(public platform: Platform,public params: NavParams,public viewCtrl: ViewController) {
    this.participantes=this.params.get('participantes');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}