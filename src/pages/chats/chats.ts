import { SalaChatModule } from './../sala-chat/sala-chat.module';
import { Component } from '@angular/core';
import { SalaChatPage } from '../sala-chat/sala-chat';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {

  salaPage = SalaChatPage;

  chats = [
    {
      nombre: 'sala1',
      autor: 'autor1',
      mensajes: 'aqui iria un array de mensajes y usuarios',
      participantes: ["uno","dos","tres","cuatro"],
      rutaFoto: '../../assets/imagenes/1.jpg',
      fecha: 'hoy'
    },
    {
      nombre: 'sala2',
      autor: 'autor2',
      mensajes: 'aqui iria un array de mensajes y usuarios',
      participantes: ["uno","dos","tres","cuatro"],
      rutaFoto: '../../assets/imagenes/1.jpg',
      fecha: 'hoy'
    },
    {
      nombre: 'sala3',
      autor: 'autor3',
      mensajes: 'aqui iria un array de mensajes y usuarios',
      participantes: ["uno","dos","tres","cuatro"],
      rutaFoto: '../../assets/imagenes/1.jpg',
      fecha: 'hoy'
    },
    {
      nombre: 'sala4',
      autor: 'autor4',
      mensajes: 'aqui iria un array de mensajes y usuarios',
      participantes: ["uno","dos","tres","cuatro"],
      rutaFoto: '../../assets/imagenes/1.jpg',
      fecha: 'hoy'
    }
  ];
  
  constructor(public navCtrl: NavController) {

  }

}
