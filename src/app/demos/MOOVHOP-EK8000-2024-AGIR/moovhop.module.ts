import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MoovHopAllPagesComponent } from './moov-hop-all-pages/moov-hop-all-pages.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BuyChoiceComponent } from './buy-tyckets/buy-choice/buy-choice.component';
import { PaymentChoiceComponent } from './payment/payment-choice/payment-choice.component';
import { PaymentCardComponent } from './payment/payment-card/payment-card.component';
import { PaymentCashComponent } from './payment/payment-cash/payment-cash.component';
import { PaymentMobilAppComponent } from './payment/payment-mobil-app/payment-mobil-app.component';
import { PaymentMobilOpComponent } from './payment/payment-mobil-op/payment-mobil-op.component';
import { PaymentMobilOpValidationComponent } from './payment/payment-mobil-op-validation/payment-mobil-op-validation.component';
import { WaitingScreenComponent } from './payment/waiting-screen/waiting-screen.component';
import { GetTicketsReceiptComponent } from './payment/get-tickets-receipt/get-tickets-receipt.component';
import { CreateAccountMenuComponent } from './subcription/create-account-menu/create-account-menu.component';
import { CreateAccountCameraComponent } from './subcription/create-account-camera/create-account-camera.component';
import { CreateAccountHelloComponent } from './subcription/create-account-hello/create-account-hello.component';
import { CreateAccountSubscriptionChoiceComponent } from './subcription/create-account-subscription-choice/create-account-subscription-choice.component';
import { CreateAccountThanksComponent } from './subcription/create-account-thanks/create-account-thanks.component';
import { ReloadIdentificationComponent } from './reload/reload-identification/reload-identification.component';
import { ReloadPersonalInformationsComponent } from './reload/reload-personal-informations/reload-personal-informations.component';
import { CreateAccountScanFinishComponent } from './subcription/create-account-scan-finish/create-account-scan-finish.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReloadThanksComponent } from './reload/reload-thanks/reload-thanks.component';
import { validationScreen } from './subcription/validation-screen/validation-screen.component'
import { CreateAccountFaceCaptureComponent } from './subcription/create-account-face-capture/create-account-face-capture.component';
import { CreateAccountFormPersonalInformationsComponent } from './subcription/create-account-personal-informations/create-account-personal-informations.component';




@NgModule({
  declarations: [
    MoovHopAllPagesComponent,
    HomepageComponent,
    BuyChoiceComponent,
    PaymentChoiceComponent,
    PaymentCardComponent,
    PaymentCashComponent,
    PaymentMobilAppComponent,
    PaymentMobilOpComponent,
    PaymentMobilOpValidationComponent,
    WaitingScreenComponent,
    GetTicketsReceiptComponent,
    CreateAccountMenuComponent,
    CreateAccountCameraComponent,
    CreateAccountHelloComponent,
    CreateAccountSubscriptionChoiceComponent,
    CreateAccountThanksComponent,
    ReloadIdentificationComponent,
    ReloadPersonalInformationsComponent,
    CreateAccountScanFinishComponent,
    ReloadThanksComponent,
    validationScreen,
    CreateAccountFaceCaptureComponent,
    CreateAccountFormPersonalInformationsComponent
  ],
  exports:[MoovHopAllPagesComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoovHop8000ModuleAGIR2024 { }

