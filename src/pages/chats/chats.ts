import { LoginPage } from './../login/login';
import { LoginService } from './../../services/login.service';
import { ApiService } from './../../services/api.service';
import { SalaChatModule } from './../sala-chat/sala-chat.module';
import { Component } from '@angular/core';
import { SalaChatPage } from '../sala-chat/sala-chat';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {


  salaPage = SalaChatPage;
  aux = '../../assets/imagenes/1.jpg';
  rooms;
  roomRecharge;

  constructor(public navCtrl: NavController,public navParams: NavParams,private logServ:LoginService, private api:ApiService) {
     
  }
  
  ngOnInit(){
     this.getRooms();
  }
  ionViewWillEnter(){
      let S = this;
      this.roomRecharge=setInterval(function(){
         S.getRooms();
      },4000);
  }
  ionViewWillLeave(){
    clearInterval(this.roomRecharge);
  }
  getRooms(){
    console.log("peticionC")
      if(this.logServ.validateUser())
      {
         this.api.getRooms().subscribe(
            
                response => {
                    if(response.json().status)
                    {
                        this.api.launchMessage(response.json().status,response.json().data);
                        this.navCtrl.setRoot(LoginPage);
                    }
                    else
                    {
                        this.rooms = response.json();
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

}
