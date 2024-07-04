import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SoftKioskService } from '../../../softkiosk.service';
import { GenericComponent } from '../../generic/generic.component';
import { LabiziService } from '../labizi.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-labizi-pay',
  templateUrl: './labizi-pay.component.html',
  styleUrls: ['./labizi-pay.component.scss', '../labizi.scss']
})

export class LabiziPayComponent extends GenericComponent implements OnInit, OnDestroy, AfterViewInit {

  cardInfoText: string = "INSEREZ VOTRE CARTE";
  constructor(skService: SoftKioskService, private labiziService: LabiziService, private router: Router) {
    super(skService);
  }

  override ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/labiziValidatedPayment']);
    }, 7000);
  }

  async changeCardInfoText() {
    let _this = this;
    setTimeout(() => {
      _this.cardInfoText = "TAPEZ VOTRE CODE";
      setTimeout(() => {
        _this.cardInfoText = "PAIEMENT AUTORISE";
        setTimeout(() => {
          console.log("Paiement autorisé");
        }, 2000);
      }, 2000);
    }, 2000);
  }

  ngAfterViewInit(): void {
    let _this = this;
    let refShoppingCart = "ticket-1234";
    // chargement du scénario
    //_this.skService.activeSoftkioskScenario("CardPayment_Debit_Without_ReceiptPrinting.json");
    // abonnement et appel d'api
    console.log("on s'abonne à l'event cardDebit de la callback onPaymentDebit");
    _this.skService.addEventListener("CardPayment", "cardDebit", this.onCardDebit);
    console.log("demande de payment");
    _this.skService.cardPaymentDebit({
      amountInCents: 1000,
      refTransaction: "ref-deb-0000",
      refShoppingCart: refShoppingCart
    });
    this.changeCardInfoText();
  }

  override onCardDebitEnd = (e: any): void => {
    switch (e.data.dataType) {
      case "CardDebited":
        let navEvent = new CustomEvent("labiziNav", {
          detail: {
            "delay": 1000,
            "goTo": "/labiziValidatedPayment"
          }
        });
        window.dispatchEvent(navEvent);
        break;
      case "CardDebitError":
        let navEvent2 = new CustomEvent("labiziNav", {
          detail: {
            "delay": 1000,
            "goTo": "/labiziValidatedPayment"
          }
        });
        window.dispatchEvent(navEvent2);
        break;
    }
  }

  ngOnDestroy = (): void => {
    let __this = this;

    console.log("Fin d'écoute de l'événement de confirmation de transaction");
    __this.skService.removeEventListener("CardPayment", "transactionConfirm", this.onTransactionConfirm);

    console.log("Fin d'écoute de l'événement  cardDebit de la callback onCardDebit");
    __this.skService.removeEventListener("CardPayment", "cardDebit", this.onCardDebit);

  }

}
