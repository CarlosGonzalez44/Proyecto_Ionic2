import { ApiService } from '../services/api.service';
import { LoginService } from '../services/login.service';

import { LoginPage } from '../pages/login/login';

import { HttpModule, JsonpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ChatsPage } from '../pages/chats/chats';
import { CuentaPage } from '../pages/cuenta/cuenta';
import { HomePage } from '../pages/home/home';
import { NoticiasPage } from '../pages/noticias/noticias';
import { NoticiaPage } from '../pages/noticia/noticia';
import { TabsPage } from '../pages/tabs/tabs';
import { SalaChatPage, ParticipantesModal } from './../pages/sala-chat/sala-chat';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    CuentaPage,
    HomePage,
    LoginPage,
    NoticiasPage,
    NoticiaPage,
    SalaChatPage, ParticipantesModal,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    CuentaPage,
    HomePage,
    NoticiasPage,
    NoticiaPage,
    SalaChatPage, ParticipantesModal,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    ApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
