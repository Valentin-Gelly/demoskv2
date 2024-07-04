import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { BuyChoiceComponent } from './buy-tyckets/buy-choice/buy-choice.component';
import { PaymentChoiceComponent } from './payment/payment-choice/payment-choice.component';
import { PaymentCardComponent } from './payment/payment-card/payment-card.component';
import { PaymentCashComponent } from './payment/payment-cash/payment-cash.component';
import { PaymentMobilAppComponent } from './payment/payment-mobil-app/payment-mobil-app.component';
import { PaymentMobilOpComponent } from './payment/payment-mobil-op/payment-mobil-op.component';
import { PaymentMobilOpValidationComponent } from './payment/payment-mobil-op-validation/payment-mobil-op-validation.component';
import { GetTicketsReceiptComponent } from './payment/get-tickets-receipt/get-tickets-receipt.component';
import { CreateAccountMenuComponent } from './subcription/create-account-menu/create-account-menu.component';
import { CreateAccountCameraComponent } from './subcription/create-account-camera/create-account-camera.component';
import { CreateAccountHelloComponent } from './subcription/create-account-hello/create-account-hello.component';
import { CreateAccountInformationValidationComponent } from './subcription/create-account-information-validation/create-account-information-validation.component';
import { CreateAccountSubscriptionChoiceComponent } from './subcription/create-account-subscription-choice/create-account-subscription-choice.component';
import { CreateAccountThanksComponent } from './subcription/create-account-thanks/create-account-thanks.component';
import { ReloadIdentificationComponent } from './reload/reload-identification/reload-identification.component';
import { ReloadPersonalInformationsComponent } from './reload/reload-personal-informations/reload-personal-informations.component';
import { WaitingScreenComponent } from './payment/waiting-screen/waiting-screen.component';
import { CreateAccountScanFinishComponent } from './subcription/create-account-scan-finish/create-account-scan-finish.component';
import { ReloadThanksComponent } from './reload/reload-thanks/reload-thanks.component';

export const routes: Routes = [
  {path: 'RNTP2023/homepage', component: HomepageComponent},
  {path: 'RNTP2023/buyChoice', component: BuyChoiceComponent},
  {path: 'RNTP2023/paymentChoice', component: PaymentChoiceComponent},
  {path: 'RNTP2023/paymentCard', component: PaymentCardComponent},
  {path: 'RNTP2023/paymentCash', component: PaymentCashComponent},
  {path: 'RNTP2023/paymentAppMobile', component: PaymentMobilAppComponent},
  {path: 'RNTP2023/paymentOpMobile', component: PaymentMobilOpComponent},
  {path: 'RNTP2023/paymentOpMobileValidation', component: PaymentMobilOpValidationComponent},
  {path: 'RNTP2023/getTicketReceipt', component: GetTicketsReceiptComponent},
  {path: 'RNTP2023/createAccountMenu', component: CreateAccountMenuComponent},
  {path: 'RNTP2023/createAccountCamera', component: CreateAccountCameraComponent},
  {path: 'RNTP2023/createAccountHello', component: CreateAccountHelloComponent},
  {path: 'RNTP2023/createAccountInformationValidation', component: CreateAccountInformationValidationComponent},
  {path: 'RNTP2023/createAccountSubscriptionChoice', component: CreateAccountSubscriptionChoiceComponent},
  {path: 'RNTP2023/createAccountThanks', component: CreateAccountThanksComponent},
  {path: 'RNTP2023/reloadIdentification', component: ReloadIdentificationComponent},
  {path: 'RNTP2023/reloadPersonalInformations', component: ReloadPersonalInformationsComponent},
  {path: 'RNTP2023/waitingScreen', component: WaitingScreenComponent},
  {path: 'RNTP2023/createAccountScanFinish', component: CreateAccountScanFinishComponent},
  {path: 'RNTP2023/reloadThanks', component: ReloadThanksComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MoovHop8000RoutingModule { }
