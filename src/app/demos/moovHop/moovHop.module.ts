import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MoovHopBuyUseCasePayComponent } from './buy-use-case/moov-hop-buy-use-case-pay/moov-hop-buy-use-case-pay.component';
import { MoovHopBuyUseCaseQrCodeComponent } from './buy-use-case/moov-hop-buy-use-case-qr-code/moov-hop-buy-use-case-qr-code.component';
import { MoovHopBuyUseCaseCameraComponent } from './buy-use-case/moov-hop-buy-use-case-camera/moov-hop-buy-use-case-camera.component';
import { MoovHopBuyUseCaseCashPaymentComponent } from './buy-use-case/moov-hop-buy-use-case-cash-payment/moov-hop-buy-use-case-cash-payment.component';
import { MoovHopBuyUseCaseScanOlderIdentityCardComponent } from './buy-use-case/moov-hop-buy-use-case-scan-older-identity-card/moov-hop-buy-use-case-scan-older-identity-card.component';
import { MoovHopBuyUseCaseScanNewerIdentityCardComponent } from './buy-use-case/moov-hop-buy-use-case-scan-newer-identity-card/moov-hop-buy-use-case-scan-newer-identity-card.component';
import { MoovHopAllPagesComponent } from './moov-hop-all-pages/moov-hop-all-pages.component';
import { MoovHopBuyCaseCongratulationsComponent } from './buy-use-case/moov-hop-buy-use-case-congratulations/moov-hop-buy-use-case-congratulations.component';
import { MoovHopBuyCaseCreateAccountComponent } from './buy-use-case/moov-hop-buy-use-case-create-account/moov-hop-buy-use-case-create-account.component';
import { MoovHopHomepageComponent } from './moov-hop-homepage/moov-hop-homepage.component';
import { MoovHopBuyUseCaseScanNewerIdentityTwoProgressingComponent } from './buy-use-case/moov-hop-buy-use-case-scan-newer-identity-two-progressing/moov-hop-buy-use-case-scan-newer-identity-two-progressing.component';
import { MoovHopReloadUseCaseConnectionComponent } from './reload-use-case/moov-hop-reload-use-case-connection/moov-hop-reload-use-case-connection.component';
import { MoovHopReloadUseCaseBuyReloadComponent } from './moov-hop-reload-use-case-buy-reload/moov-hop-reload-use-case-buy-reload.component';
import { MoovHopReloadUseCaseSummaryComponent } from './reload-use-case/moov-hop-reload-use-case-summary/moov-hop-reload-use-case-summary.component';
import { MoovHopBuyUseCaseYourPurchaseComponent } from './buy-use-case/moov-hop-buy-use-case-your-purchase/moov-hop-buy-use-case-your-purchase.component';
import { MoovHopBuyUseCaseChooseTravelComponent } from './buy-use-case/moov-hop-buy-use-case-choose-travel/moov-hop-buy-use-case-choose-travel.component';
import { MoovHopBuyUseCaseYourNeedComponent } from './buy-use-case/moov-hop-buy-use-case-your-need/moov-hop-buy-use-case-your-need.component';
import { MoovHopBuyUseCaseSummaryComponent } from './buy-use-case/moov-hop-buy-use-case-summary/moov-hop-buy-use-case-summary.component';
import { MoovHopBuyUseCaseSelectPaymentComponent } from './buy-use-case/moov-hop-buy-use-case-select-payment/moov-hop-buy-use-case-select-payment.component';
import { MoovHopBuyUseCaseCreateAccMoovpassComponent } from './buy-use-case/moov-hop-buy-use-case-create-acc-moovpass/moov-hop-buy-use-case-create-acc-moovpass.component';
import { MoovHopReloadUseCaseYourNeedComponent } from './reload-use-case/moov-hop-reload-use-case-your-need/moov-hop-reload-use-case-your-need.component';
import { MoovHopBuyUseCaseCreateAccPpCiComponent } from './buy-use-case/moov-hop-buy-use-case-create-acc-pp-ci/moov-hop-buy-use-case-create-acc-pp-ci.component';
import { MoovHopBuyUseCaseCreateAccFormComponent } from './buy-use-case/moov-hop-buy-use-case-create-acc-form/moov-hop-buy-use-case-create-acc-form.component';
import { MoovHopBuyUseCaseSelectPaymentMpTwoComponent } from './buy-use-case/moov-hop-buy-use-case-select-payment-mp-two/moov-hop-buy-use-case-select-payment-mp-two.component';
import { MoovHopBuyUseCaseCardPaymentTwoComponent } from './buy-use-case/moov-hop-buy-use-case-card-payment-two/moov-hop-buy-use-case-card-payment-two.component';
import { MoovHopBuyUseCaseCashPaymentTwoComponent } from './buy-use-case/moov-hop-buy-use-case-cash-payment-two/moov-hop-buy-use-case-cash-payment-two.component';
import { MoovHopBuyUseCaseQrCodeTwoComponent } from './buy-use-case/moov-hop-buy-use-case-qr-code-two/moov-hop-buy-use-case-qr-code-two.component';
import { MoovHopBuyUseCaseCongratulationsTwoComponent } from './buy-use-case/moov-hop-buy-use-case-congratulations-two/moov-hop-buy-use-case-congratulations-two.component';
import { MoovHopReloadUseCaseSelectPaymentComponent } from './reload-use-case/moov-hop-reload-use-case-select-payment/moov-hop-reload-use-case-select-payment.component';
import { MoovHopReloadUseCaseCardPaymentComponent } from './reload-use-case/moov-hop-reload-use-case-card-payment/moov-hop-reload-use-case-card-payment.component';
import { MoovHopReloadUseCaseCashPaymentComponent } from './reload-use-case/moov-hop-reload-use-case-cash-payment/moov-hop-reload-use-case-cash-payment.component';
import { MoovHopReloadUseCaseQrCodeComponent } from './reload-use-case/moov-hop-reload-use-case-qr-code/moov-hop-reload-use-case-qr-code.component';
import { MoovHopReloadUseCaseCongratulationsComponent } from './reload-use-case/moov-hop-reload-use-case-congratulations/moov-hop-reload-use-case-congratulations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoovHopBuyUseCaseScanOlderCiFiniseComponent } from './buy-use-case/moov-hop-buy-use-case-scan-older-ci-finise/moov-hop-buy-use-case-scan-older-ci-finise.component';
import { MoovHopBuyUseCaseNewerCiScanFinishedComponent } from './buy-use-case/moov-hop-buy-use-case-newer-ci-scan-finished/moov-hop-buy-use-case-newer-ci-scan-finished.component';
import { MoovHopBuyUseCaseNewerCiOneProgressingComponent } from './buy-use-case/moov-hop-buy-use-case-newer-ci-one-progressing/moov-hop-buy-use-case-newer-ci-one-progressing.component';

@NgModule({
  declarations: [
    MoovHopBuyUseCasePayComponent,
    MoovHopBuyUseCaseQrCodeComponent,
    MoovHopBuyUseCaseCameraComponent,
    MoovHopBuyUseCaseCashPaymentComponent,
    MoovHopBuyUseCaseScanOlderIdentityCardComponent,
    MoovHopBuyUseCaseScanNewerIdentityCardComponent,
    MoovHopAllPagesComponent,
    MoovHopBuyCaseCongratulationsComponent,
    MoovHopBuyCaseCreateAccountComponent,
    MoovHopHomepageComponent,
    MoovHopBuyUseCaseScanNewerIdentityTwoProgressingComponent,
    MoovHopReloadUseCaseConnectionComponent,
    MoovHopReloadUseCaseBuyReloadComponent,
    MoovHopReloadUseCaseSummaryComponent,
    MoovHopBuyUseCaseYourPurchaseComponent,
    MoovHopBuyUseCaseChooseTravelComponent,
    MoovHopBuyUseCaseYourNeedComponent,
    MoovHopBuyUseCaseSummaryComponent,
    MoovHopBuyUseCaseSelectPaymentComponent,
    MoovHopBuyUseCaseCreateAccMoovpassComponent,
    MoovHopReloadUseCaseYourNeedComponent,
    MoovHopBuyUseCaseCreateAccPpCiComponent,
    MoovHopBuyUseCaseCreateAccFormComponent,
    MoovHopBuyUseCaseSelectPaymentMpTwoComponent,
    MoovHopBuyUseCaseCardPaymentTwoComponent,
    MoovHopBuyUseCaseCashPaymentTwoComponent,
    MoovHopBuyUseCaseQrCodeTwoComponent,
    MoovHopBuyUseCaseCongratulationsTwoComponent,
    MoovHopReloadUseCaseSelectPaymentComponent,
    MoovHopReloadUseCaseCardPaymentComponent,
    MoovHopReloadUseCaseCashPaymentComponent,
    MoovHopReloadUseCaseQrCodeComponent,
    MoovHopReloadUseCaseCongratulationsComponent,
    MoovHopBuyUseCaseScanOlderCiFiniseComponent,
    MoovHopBuyUseCaseNewerCiScanFinishedComponent,
    MoovHopBuyUseCaseNewerCiOneProgressingComponent
  ], exports: [MoovHopAllPagesComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoovopModule { }
