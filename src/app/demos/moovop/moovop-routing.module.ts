import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoovopQrCodeComponent } from './moovop-qr-code/moovop-qr-code.component';
import { MoovopCongratulationsComponent } from './moovop-congratulations/moovop-congratulations.component';
import { MoovopRecupCardComponent } from './moovop-recup-card/moovop-recup-card.component';
import { MoovopAllPagesComponent } from './moovop-all-pages/moovop-all-pages.component';
const routes: Routes = [
    {path: 'moovopRecupCard', component: MoovopRecupCardComponent},
    {path: 'moovopQrCode', component: MoovopQrCodeComponent},
    {path: 'moovopCongratulations', component: MoovopCongratulationsComponent},
    {path: 'moovopAllPages', component: MoovopAllPagesComponent}
];

@NgModule({
  imports:
    [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MoovopRoutingModule { }

