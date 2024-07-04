import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabiziAllPagesComponent } from './labizi-all-pages/labizi-all-pages.component';
import { LabiziVitalCardComponent } from './labizi-vital-card/labizi-vital-card.component';
import { LabiziValidatedPaymentComponent } from './labizi-validated-payment/labizi-validated-payment.component';
import { LabiziHomepageComponent } from './labizi-homepage/labizi-homepage.component';
import { LabiziPayComponent } from './labizi-pay/labizi-pay.component';
import { LabiziQrCodeComponent } from './labizi-qr-code/labizi-qr-code.component';
import { LabiziRdvComponent } from './labizi-rdv/labizi-rdv.component';
import { LabiziSelectQueueComponent } from './labizi-select-queue/labizi-select-queue.component';
import { LabiziValidatedQueueComponent } from './labizi-validated-queue/labizi-validated-queue.component';

const routes: Routes = [
  { path: 'labiziVitalCard', component: LabiziVitalCardComponent },
  { path: 'labiziAllPages', component: LabiziAllPagesComponent },
  { path: 'labiziSelectQueue', component: LabiziSelectQueueComponent },
  { path: 'labiziValidatedQueue', component: LabiziValidatedQueueComponent },
  { path: 'labiziHomepage', component: LabiziHomepageComponent },
  { path: 'labiziQrCode', component: LabiziQrCodeComponent },
  { path: 'labiziPay', component: LabiziPayComponent},
  { path: 'labiziRdv', component: LabiziRdvComponent},
  { path: 'labiziValidatedPayment', component: LabiziValidatedPaymentComponent},
];

@NgModule({
  imports:
    [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LabiziRoutingModule { }

