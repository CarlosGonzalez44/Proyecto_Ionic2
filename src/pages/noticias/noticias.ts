import { Noticia } from './../../models/noticia';
import { ApiService } from './../../services/api.service';
import { LoginPage } from './../login/login';
import { LoginService } from './../../services/login.service';
import { NoticiaPage } from './../noticia/noticia';
import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Categoria } from "../../models/categoria";


@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html'
})
export class NoticiasPage {
  
  noticiaPage = NoticiaPage;
  aux = '../../assets/imagenes/1.jpg';
  cat:Categoria;
  noticias:Array<Noticia>;
  categorias:Array<Categoria>;

  constructor(public navCtrl: NavController,public navParams: NavParams,private logServ:LoginService, private api:ApiService,private app:App) {
     //this.noticias = JSON.parse(localStorage.getItem('noticias'));

  }

  ngOnInit(){
    var S = this;
    //-1 seria el id de la categoria seleccionada, en este caso queremos todas las noticias sin filtrar por lo que ponemos -1
    this.api.getNewsAndCategorys(-1,function(result){
        console.log(result);
        //si retorna false significa que el servidor no ha dado por bueno el token
        if(result==false){
            this.app.getRootNav().setRoot(LoginPage);
        }
        else{
            S.noticias = result[0];
            S.categorias = result[1];
        }
    }); 
  }

  filtroNoticias(){

    var S = this;
    //seria el id de la categoria seleccionada
    this.api.getNewsAndCategorys(this.cat,function(result){
        console.log(result);
        //si retorna false significa que el servidor no ha dado por bueno el token
        if(result==false){
            this.app.getRootNav().setRoot(LoginPage);
        }
        else{
            S.noticias = result[0];
            S.categorias = result[1];
        }
    });
  }

  doRefresh(refresher){

    var S = this;
    //-1 seria el id de la categoria seleccionada, en este caso queremos todas las noticias sin filtrar por lo que ponemos -1
    this.api.getNewsAndCategorys(-1,function(result){
        console.log(result);
        //si retorna false significa que el servidor no ha dado por bueno el token
        if(result==false){
            this.app.getRootNav().setRoot(LoginPage);
        }
        else{
            S.noticias = result[0];
            S.categorias = result[1];
        }
        refresher.complete();
    });
  }
}
