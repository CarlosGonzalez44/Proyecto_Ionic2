import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-noticia',
  templateUrl: 'noticia.html',
})
export class NoticiaPage {

  noticia:object;
  aux = '../../assets/imagenes/1.jpg';
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.noticia=navParams.data;

  }


}
