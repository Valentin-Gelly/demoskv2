import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MoovopAllPagesComponent } from './moovop-all-pages/moovop-all-pages.component';
import { MoovopCongratulationsComponent } from './moovop-congratulations/moovop-congratulations.component';
import { MoovopQrCodeComponent } from './moovop-qr-code/moovop-qr-code.component';
import { MoovopRecupCardComponent } from './moovop-recup-card/moovop-recup-card.component';

@NgModule({
  declarations: [
    MoovopAllPagesComponent,
    MoovopCongratulationsComponent,
    MoovopQrCodeComponent,
    MoovopRecupCardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoovopModule { }
