import { ApiService } from './../../services/api.service';
import { LoginPage } from './../login/login';
import { LoginService } from './../../services/login.service';
import { NoticiaPage } from './../noticia/noticia';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html'
})
export class NoticiasPage {
    
  noticiaPage = NoticiaPage;
  aux = '../../assets/imagenes/1.jpg';
  cat;
  noticias;
  categorias;

  constructor(public navCtrl: NavController,public navParams: NavParams,public logServ:LoginService, public api:ApiService) {
     //this.noticias = JSON.parse(localStorage.getItem('noticias'));
  }

  ngOnInit(){

      if(this.logServ.validateUser())
      {
         this.api.getNewsAndCategorys().subscribe(
            
                response => {
                    if(response.json().status)
                    {
                        this.api.launchMessage(response.json().status,response.json().data);
                        this.navCtrl.setRoot(LoginPage);
                    }
                    else
                    {
                        this.noticias = response.json()[0];
                        this.categorias = response.json()[1];
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

  filtroNoticias(){

      if(this.logServ.validateUser())
      {
          this.api.getNewsAndCategorys().subscribe(
             response => 
                    { 
                        if(response.json().status)
                        {
                            this.api.launchMessage(response.json().status,response.json().data);
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

  doRefresh(refresher){

      if(this.logServ.validateUser())
      {
          this.api.getNewsAndCategorys().subscribe(
             response => 
             { 
                        if(response.json().status)
                        {
                            this.api.launchMessage(response.json().status,response.json().data);
                            this.navCtrl.setRoot(LoginPage);
                        }
                        else
                        {
                            this.noticias = response.json()[0];
                            this.categorias = response.json()[1];
                        }
                        refresher.complete();
             },
             error => {
                 this.api.launchMessage('500',error);
                 refresher.complete();
             }
          );
      }
      else
      {
          this.api.launchMessage('Error de autenticación','Debes estar logeado para acceder a esta página.');
          this.navCtrl.setRoot(LoginPage);
          refresher.complete();
      }
  }
}
