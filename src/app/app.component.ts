import { LoginPage } from './../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { LoginService } from '../services/login.service';

@Component({
  templateUrl: 'app.html',
  providers: [LoginService]
})
export class MyApp {
  rootPage:any = LoginPage;

  public identity;
  public token;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _loginService:LoginService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  //compruebo al inicio de carga de la aplicacion que el usuario esta autentificado y en caso de estarlo ya no le aparecera
  //la pagina de login como principal sino tabs
  ngOnInit(){
    //localStorage.clear();
    this.identity = this._loginService.getIdentity();
    this.token = this._loginService.getToken();

    if(this.identity){
        this.rootPage = TabsPage;
    }

  }

}
