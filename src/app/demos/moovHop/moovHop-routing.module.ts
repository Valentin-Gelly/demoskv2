import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoovHopBuyUseCasePayComponent } from './buy-use-case/moov-hop-buy-use-case-pay/moov-hop-buy-use-case-pay.component';
import { MoovHopBuyCaseCongratulationsComponent } from './buy-use-case/moov-hop-buy-use-case-congratulations/moov-hop-buy-use-case-congratulations.component';
import { MoovHopHomepageComponent } from './moov-hop-homepage/moov-hop-homepage.component';
import { MoovHopReloadUseCaseSummaryComponent } from './reload-use-case/moov-hop-reload-use-case-summary/moov-hop-reload-use-case-summary.component';
import { MoovHopReloadUseCaseConnectionComponent } from './reload-use-case/moov-hop-reload-use-case-connection/moov-hop-reload-use-case-connection.component';
import { MoovHopBuyUseCaseYourPurchaseComponent } from './buy-use-case/moov-hop-buy-use-case-your-purchase/moov-hop-buy-use-case-your-purchase.component';
import { MoovHopBuyUseCaseChooseTravelComponent } from './buy-use-case/moov-hop-buy-use-case-choose-travel/moov-hop-buy-use-case-choose-travel.component';
import { MoovHopBuyUseCaseYourNeedComponent } from './buy-use-case/moov-hop-buy-use-case-your-need/moov-hop-buy-use-case-your-need.component';
import { MoovHopBuyUseCaseCreateAccMoovpassComponent } from './buy-use-case/moov-hop-buy-use-case-create-acc-moovpass/moov-hop-buy-use-case-create-acc-moovpass.component';
import { MoovHopReloadUseCaseYourNeedComponent } from './reload-use-case/moov-hop-reload-use-case-your-need/moov-hop-reload-use-case-your-need.component';
import { MoovHopBuyUseCaseSummaryComponent } from './buy-use-case/moov-hop-buy-use-case-summary/moov-hop-buy-use-case-summary.component';
import { MoovHopBuyUseCaseSelectPaymentComponent } from './buy-use-case/moov-hop-buy-use-case-select-payment/moov-hop-buy-use-case-select-payment.component';
import { MoovHopBuyUseCaseScanOlderIdentityCardComponent } from './buy-use-case/moov-hop-buy-use-case-scan-older-identity-card/moov-hop-buy-use-case-scan-older-identity-card.component';
import { MoovHopBuyUseCaseScanOlderCiFiniseComponent } from './buy-use-case/moov-hop-buy-use-case-scan-older-ci-finise/moov-hop-buy-use-case-scan-older-ci-finise.component';
import { MoovHopBuyUseCaseScanNewerIdentityCardComponent } from './buy-use-case/moov-hop-buy-use-case-scan-newer-identity-card/moov-hop-buy-use-case-scan-newer-identity-card.component';
import { MoovHopBuyUseCaseCreateAccFormComponent } from './buy-use-case/moov-hop-buy-use-case-create-acc-form/moov-hop-buy-use-case-create-acc-form.component';
import { MoovHopBuyUseCaseCreateAccPpCiComponent } from './buy-use-case/moov-hop-buy-use-case-create-acc-pp-ci/moov-hop-buy-use-case-create-acc-pp-ci.component';
import { MoovHopBuyUseCaseScanNewerIdentityTwoProgressingComponent } from './buy-use-case/moov-hop-buy-use-case-scan-newer-identity-two-progressing/moov-hop-buy-use-case-scan-newer-identity-two-progressing.component';
import { MoovHopBuyUseCaseCashPaymentComponent } from './buy-use-case/moov-hop-buy-use-case-cash-payment/moov-hop-buy-use-case-cash-payment.component';
import { MoovHopBuyCaseCreateAccountComponent } from './buy-use-case/moov-hop-buy-use-case-create-account/moov-hop-buy-use-case-create-account.component';
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
import { MoovHopAllPagesComponent } from './moov-hop-all-pages/moov-hop-all-pages.component';
import { MoovHopBuyUseCaseQrCodeComponent } from './buy-use-case/moov-hop-buy-use-case-qr-code/moov-hop-buy-use-case-qr-code.component';
import { MoovHopBuyUseCaseNewerCiOneProgressingComponent } from './buy-use-case/moov-hop-buy-use-case-newer-ci-one-progressing/moov-hop-buy-use-case-newer-ci-one-progressing.component';
import { MoovHopBuyUseCaseNewerCiScanFinishedComponent } from './buy-use-case/moov-hop-buy-use-case-newer-ci-scan-finished/moov-hop-buy-use-case-newer-ci-scan-finished.component';
const routes: Routes = [
  {path: 'moovHopBuyUseCaseCardPayment', component: MoovHopBuyUseCasePayComponent},
  {path: 'moovHopBuyUseCaseCashPayment', component: MoovHopBuyUseCaseCashPaymentComponent},
  {path: 'moovHopAllPages', component: MoovHopAllPagesComponent},
  {path: 'moovHopBuyCaseQrCode', component: MoovHopBuyUseCaseQrCodeComponent},
  {path: 'moovHopBuyCaseCreateAccountCamera', component: MoovHopBuyCaseCreateAccountComponent},
  {path: 'moovHopBuyUseCaseCongratulations', component: MoovHopBuyCaseCongratulationsComponent},
  {path: 'moovHopHomepage', component: MoovHopHomepageComponent},
  {path: 'moovHopBuyUseCaseSummary', component: MoovHopBuyUseCaseSummaryComponent},
  {path: 'moovHopBuyUseCaseOlderCIScan', component: MoovHopBuyUseCaseScanOlderIdentityCardComponent},
  {path: 'moovHopBuyUseCaseOlderCIScanFinished', component: MoovHopBuyUseCaseScanOlderCiFiniseComponent},
  {path: 'moovHopBuyUseCaseNewerCIScan', component: MoovHopBuyUseCaseScanNewerIdentityCardComponent},
  {path: 'moovHopBuyUseCaseNewerCIScanTwoProgressing', component: MoovHopBuyUseCaseScanNewerIdentityTwoProgressingComponent},
  {path: 'moovHopBuyUseCaseNewerCIScanOneProgressing', component: MoovHopBuyUseCaseNewerCiOneProgressingComponent},
  {path: 'moovHopBuyUseCaseNewerCIScanFinished', component: MoovHopBuyUseCaseNewerCiScanFinishedComponent},
  {path: 'moovHopBuyUseCaseCreateAccForm', component: MoovHopBuyUseCaseCreateAccFormComponent},
  {path: 'moovHopBuyUseCaseCreateAccountPPCI', component: MoovHopBuyUseCaseCreateAccPpCiComponent},
  {path: 'moovHopBuyUseCaseYourPurchase', component: MoovHopBuyUseCaseYourPurchaseComponent },
  {path: 'moovHopBuyUseCaseChooseTravel', component: MoovHopBuyUseCaseChooseTravelComponent},
  {path: 'moovHopBuyUseCaseYourNeed', component: MoovHopBuyUseCaseYourNeedComponent},
  {path: 'moovHopBuyUseCaseCreateAccountMoovPass', component: MoovHopBuyUseCaseCreateAccMoovpassComponent},
  {path: 'moovHopBuyUseCaseSelectPaymentTwo', component: MoovHopBuyUseCaseSelectPaymentMpTwoComponent},
  {path: 'moovHopBuyUseCaseCardPaymentTwo', component: MoovHopBuyUseCaseCardPaymentTwoComponent},
  {path: 'moovHopBuyUseCaseCashPaymentTwo', component: MoovHopBuyUseCaseCashPaymentTwoComponent},
  {path: 'moovHopBuyUseCaseQrCodeTwo', component: MoovHopBuyUseCaseQrCodeTwoComponent},
  {path: 'moovHopBuyUseCaseCongratulationsTwo', component: MoovHopBuyUseCaseCongratulationsTwoComponent},
  {path: 'moovHopBuyUseCaseSelectPayment', component: MoovHopBuyUseCaseSelectPaymentComponent},
  {path: 'moovHopRealoadUseCaseConnection', component: MoovHopReloadUseCaseConnectionComponent},
  {path: 'moovHopReloadUseCaseYourNeed', component: MoovHopReloadUseCaseYourNeedComponent},
  {path: 'moovHopReloadUseCaseSummary', component: MoovHopReloadUseCaseSummaryComponent},
  {path: 'moovHopReloadUseCaseSelectPayment', component: MoovHopReloadUseCaseSelectPaymentComponent},
  {path: 'moovHopReloadUseCaseCardPayment', component: MoovHopReloadUseCaseCardPaymentComponent},
  {path: 'moovHopReloadUseCaseCashPayment', component: MoovHopReloadUseCaseCashPaymentComponent},
  {path: 'moovHopReloadUseCaseQrCode', component: MoovHopReloadUseCaseQrCodeComponent},
  {path: 'moovHopReloadUseCaseCongratulations', component: MoovHopReloadUseCaseCongratulationsComponent}

];

@NgModule({
  imports:
    [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MoovHopRoutingModule { }

