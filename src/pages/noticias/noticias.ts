import { ApiService } from './../../services/api.service';
import { LoginPage } from './../login/login';
import { LoginService } from './../../services/login.service';
import { NoticiaPage } from './../noticia/noticia';
import { ChatsPage } from './../chats/chats';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';


@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html'
})
export class NoticiasPage {
  noticiaPage = NoticiaPage;
  private url = "http://localhost/depinfo/web/app_dev.php";
  private headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
  aux = '../../assets/imagenes/1.jpg';
  cat;
  public noticias;
  categorias;

  constructor(public navCtrl: NavController,public _http: Http,public navParams: NavParams,public logServ:LoginService,public alertCtrl: AlertController, public api:ApiService) {
     //this.noticias = JSON.parse(localStorage.getItem('noticias'));
  }
  setNoticias(n){
     this.noticias = n;

  }
  ngOnInit(){
      var token = this.logServ.getToken();
      if(token!=null){
         this.api.getNewsAndCategorys().subscribe(
            
                response => {
                    if(response.json().status)
                    {
                        let alert = this.alertCtrl.create({
                                title: response.json().status,
                                message: response.json().data,
                                buttons: ['Volver']
                        });
                        alert.present();
                        this.navCtrl.setRoot(LoginPage);
                    }
                    else
                    {
                        this.noticias = response.json()[0];
                        this.categorias = response.json()[1];
                    }
                },
                error => {
                    let alert = this.alertCtrl.create({
                        title: '500',
                        message: error,
                        buttons: ['Volver']
                    });
                    alert.present();
                }
          );
      }
      else
      {
          let alert = this.alertCtrl.create({
                title: 'Error de autenticación',
                message: 'Debes estar logeado para acceder a esta página.',
                buttons: ['Volver']
                });
          alert.present();
          this.navCtrl.setRoot(LoginPage);
      }
      
  }

  filtroNoticias(){
      var token = this.logServ.getToken();
      if(token!=null){
          this.api.getNewsAndCategorys().subscribe(
             response => 
                    { 
                        if(response.json().status)
                        {
                            let alert = this.alertCtrl.create({
                                title: 'Error '+response.json().status,
                                message: response.json().data,
                                buttons: ['Volver']
                            });
                            alert.present();
                            this.navCtrl.setRoot(LoginPage);
                        }
                        else
                        {
                            this.noticias=[];
                            if(this.cat != -1)
                            {
                                for(let n of response.json()[0])
                                {
                                    if(n.category.id == this.cat){
                                        this.noticias.push(n);
                                    }
                                }
                            }
                            else{
                                this.noticias = response.json()[0];
                            }
                            this.categorias = response.json()[1];
                        }
                    },
             error => {
                 let alert = this.alertCtrl.create({
                      title: '500',
                      message: error,
                      buttons: ['Volver']
                 });
                 alert.present();
             }
          );
      }
      else
      {
          let alert = this.alertCtrl.create({
                title: 'Error de autenticación',
                message: 'Debes estar logeado para acceder a esta página.',
                buttons: ['Volver']
                });
          alert.present();
          this.navCtrl.setRoot(LoginPage);
      }
  }

  doRefresh(refresher){

    var token = this.logServ.getToken();
      if(token!=null){
          this.api.getNewsAndCategorys().subscribe(
             response => 
                    { 
                        if(response.json().status)
                        {
                            let alert = this.alertCtrl.create({
                                title: 'Error '+response.json().status,
                                message: response.json().data,
                                buttons: ['Volver']
                            });
                            alert.present();
                            this.navCtrl.setRoot(LoginPage);
                            refresher.complete();
                        }
                        else
                        {
                            this.noticias = response.json()[0];
                            this.categorias = response.json()[1];
                            refresher.complete();
                        }
                    },
             error => {
                 let alert = this.alertCtrl.create({
                      title: '500',
                      message: error,
                      buttons: ['Volver']             
                 });
                 alert.present();
                 refresher.complete();
             }
          );
      }
      else
      {
          let alert = this.alertCtrl.create({
                title: 'Error de autenticación',
                message: 'Debes estar logeado para acceder a esta página.',
                buttons: ['Volver']
                });
          alert.present();
          this.navCtrl.setRoot(LoginPage);
          refresher.complete();
      }
  }
}
