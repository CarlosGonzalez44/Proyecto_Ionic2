import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiaPage } from './noticia';

@NgModule({
  declarations: [
    NoticiaPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticiaPage),
  ],
  exports: [
    NoticiaPage
  ]
})
export class NoticiaModule {}
