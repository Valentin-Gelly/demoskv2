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
//import { CreateAccountInformationValidationComponent } from './subcription/create-account-information-validation/create-account-information-validation.component';
import { CreateAccountSubscriptionChoiceComponent } from './subcription/create-account-subscription-choice/create-account-subscription-choice.component';
import { CreateAccountThanksComponent } from './subcription/create-account-thanks/create-account-thanks.component';
import { ReloadIdentificationComponent } from './reload/reload-identification/reload-identification.component';
import { ReloadPersonalInformationsComponent } from './reload/reload-personal-informations/reload-personal-informations.component';
import { WaitingScreenComponent } from './payment/waiting-screen/waiting-screen.component';
import { CreateAccountScanFinishComponent } from './subcription/create-account-scan-finish/create-account-scan-finish.component';
import { ReloadThanksComponent } from './reload/reload-thanks/reload-thanks.component';
import { validationScreen } from './subcription/validation-screen/validation-screen.component';
import { CreateAccountFaceCaptureComponent } from './subcription/create-account-face-capture/create-account-face-capture.component';
import { CreateAccountFormPersonalInformationsComponent } from './subcription/create-account-personal-informations/create-account-personal-informations.component';

export const routes: Routes = [
  {path: 'EK80002024AGIR/homepage', component: HomepageComponent},
  {path: 'EK80002024AGIR/buyChoice', component: BuyChoiceComponent},
  {path: 'EK80002024AGIR/paymentChoice', component: PaymentChoiceComponent},
  {path: 'EK80002024AGIR/paymentCard', component: PaymentCardComponent},
  {path: 'EK80002024AGIR/paymentCash', component: PaymentCashComponent},
  {path: 'EK80002024AGIR/paymentAppMobile', component: PaymentMobilAppComponent},
  {path: 'EK80002024AGIR/paymentOpMobile', component: PaymentMobilOpComponent},
  {path: 'EK80002024AGIR/paymentOpMobileValidation', component: PaymentMobilOpValidationComponent},
  {path: 'EK80002024AGIR/getTicketReceipt', component: GetTicketsReceiptComponent},
  {path: 'EK80002024AGIR/createAccountMenu', component: CreateAccountMenuComponent},
  {path: 'EK80002024AGIR/createAccountCamera', component: CreateAccountCameraComponent},
  {path: 'EK80002024AGIR/createAccountHello', component: CreateAccountHelloComponent},
 // {path: 'EK80002024AGIR/createAccountInformationValidation', component: CreateAccountInformationValidationComponent},
  {path: 'EK80002024AGIR/createAccountSubscriptionChoice', component: CreateAccountSubscriptionChoiceComponent},
  {path: 'EK80002024AGIR/createAccountThanks', component: CreateAccountThanksComponent},
  {path: 'EK80002024AGIR/reloadIdentification', component: ReloadIdentificationComponent},
  {path: 'EK80002024AGIR/reloadPersonalInformations', component: ReloadPersonalInformationsComponent},
  {path: 'EK80002024AGIR/waitingScreen', component: WaitingScreenComponent},
  {path: 'EK80002024AGIR/createAccountScanFinish', component: CreateAccountScanFinishComponent},
  {path: 'EK80002024AGIR/reloadThanks', component: ReloadThanksComponent},  
  {path: 'EK80002024AGIR/validationScreen', component: validationScreen},
  {path: 'EK80002024AGIR/createAccountFaceCapture', component: CreateAccountFaceCaptureComponent},
  {path: 'EK80002024AGIR/createAccountFormPersonalInformations', component: CreateAccountFormPersonalInformationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MoovHop8000RoutingModuleAGIR2024 { }
