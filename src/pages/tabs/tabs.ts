import { Http,Response, Headers } from '@angular/http';
import { LoginService } from './../../services/login.service';

import { Component } from '@angular/core';

import { ChatsPage } from '../chats/chats';
import { CuentaPage } from '../cuenta/cuenta';
import { HomePage } from '../home/home';
import { NoticiasPage } from '../noticias/noticias';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ChatsPage;
  tab3Root = CuentaPage;
  tab4Root = NoticiasPage;

  public user = "";
  public identity;

  constructor(private _loginService:LoginService,private _http: Http) {
    //cojo la identidad del usuario y pongo el nombre del usuario en el boton perfil
      this.identity = this._loginService.getIdentity();
      if(this.identity){
         this.user = this.identity.name;
      }
  }
}
