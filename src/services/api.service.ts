import { LoginPage } from './../pages/login/login';
import { LoginService } from './login.service';
import {AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class ApiService {

    public url = "http://localhost/depinfo/web/app_dev.php";
	public headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    constructor(public _http: Http,public logServ:LoginService,public alertCtrl: AlertController){

    }

	getNewsAndCategorys(){
		var token = this.logServ.getToken();

		return this._http.get(this.url+"/noticiasapp/"+token ,{headers : this.headers})		
	}

}
