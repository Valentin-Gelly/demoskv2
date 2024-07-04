import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabiziVitalCardComponent } from './labizi-vital-card/labizi-vital-card.component';
import { LabiziAllPagesComponent } from './labizi-all-pages/labizi-all-pages.component';
import { LabiziSelectQueueComponent } from './labizi-select-queue/labizi-select-queue.component';
import { LabiziValidatedQueueComponent } from './labizi-validated-queue/labizi-validated-queue.component';
import { LabiziHomepageComponent } from './labizi-homepage/labizi-homepage.component';
import { LabiziQrCodeComponent } from './labizi-qr-code/labizi-qr-code.component';
import { LabiziPayComponent } from './labizi-pay/labizi-pay.component';
import { LabiziValidatedPaymentComponent} from './labizi-validated-payment/labizi-validated-payment.component'
import { LabiziRdvComponent } from './labizi-rdv/labizi-rdv.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    LabiziVitalCardComponent,
    LabiziAllPagesComponent,
    LabiziSelectQueueComponent,
    LabiziValidatedQueueComponent,
    LabiziQrCodeComponent,
    LabiziHomepageComponent,
    LabiziPayComponent,
    LabiziValidatedPaymentComponent,
    LabiziRdvComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: []
})
export class LabiziModule { }
