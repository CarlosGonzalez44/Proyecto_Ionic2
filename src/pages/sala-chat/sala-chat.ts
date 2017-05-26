import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams, AlertController,ViewController,Platform } from 'ionic-angular';



@Component({
  selector: 'page-sala-chat',
  templateUrl: 'sala-chat.html',
})
export class SalaChatPage {

  sala;
  rutaFoto = '../../assets/imagenes/1.jpg';
  mensajes = [
    {
      autor: 'autor1',
      contenido: 'aqui iria un array de mensajes y usuarios',
      fecha: 'hoy'
    },
    {
      autor: 'autor2',
      contenido: 'aqui iria un array de mensajes y usuarios',
      fecha: 'hoy'
    },
    {
      autor: 'autor3',
      contenido: 'aqui iria un array de mensajes y usuarios',
      fecha: 'hoy'
    },
    {
      autor: 'autor4',
      contenido: 'mensaje condenadanadanadanadanadanadanadanadanadanadanadanadanadanadamente largo',
      fecha: 'hoy'
    }
  ];

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController) {
    this.sala = navParams.data;
  } 

  /*mostrarParticipantes(){
    let alerta = this.alertCtrl.create({
      message: this.sala.participantes,
      buttons: ["Cerrar"]
    });

    alerta.present();

  }*/
  mostrarParticipantes() {

    let modal = this.modalCtrl.create(ParticipantesModal,{"participantes":this.sala.participantes});
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
        <h2>{{p}}</h2>
      </ion-item>
  </ion-list>
</ion-content>
`
})
export class ParticipantesModal {
  participantes;
  rutaFoto = '../../assets/imagenes/1.jpg';
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.participantes=this.params.get('participantes');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}