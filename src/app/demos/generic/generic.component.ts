import { Component, OnInit } from '@angular/core';
import { SoftKioskService } from '../../softkiosk.service';

@Component({
  selector: 'app-generic',
  template: '<div> </div>'
})
export class GenericComponent implements OnInit {

  constructor(public skService: SoftKioskService) {
    this.skService = skService;
  }

  ngOnInit(): void {
  }

  onCardPresenceCheck = (e: any): void => {
    switch (e.data.dataType) {
      case "CardPresenceChecked":
        if (e.data.isPresent) {
          // event vitaleRead
          this.skService.addEventListener("VitaleCardReading", "vitaleRead", this.onVitaleRead);
          this.skService.readVitale(15);
        } else {
          // event cardRead
          this.skService.addEventListener("VitaleCardReading", "cardRead", this.onCardRead);
        }
        break;
      case "CardPresenceCheckError":
      /**
       * Evènement de test de présence de carte échoué
       * Champs associés:
       * @param {("None" | "ErrorRecupConfig" | "StatusError" | "StateError" | "BadFormat" | "Unknown" | "HttpTimeout" | "AuthenticationError" | "ConnectionError")} e.data.code - Erreur sur test de présence de carte
       * @param {string} e.data.description - description erreur
       * @param {string} e.data.dataType - Type de l'événement (sa classe).
       */
    }
  }

  onRawPdfPrint = (e: any): any => {
    switch (e.data.dataType) {
      case 'RawHtmlPrinted':
        // traitement pour le changement de vue
        break;
      case 'RawHtmlPrintError':
        console.error(e.data.code + ": " + e.data.description);
        this.handlePrintError(e.data.code);
        break;
    }
  }

  /** exemple d'appel à SK sans fonctions fléchées */
  onCardRead = (e: any): void => {
    switch (e.data.dataType) {
      case 'CardDetected':
        this.skService.addEventListener("VitaleCardReading", "vitaleRead", this.onVitaleRead);
        this.skService.readVitale(15);
        break;
      case 'CardRemoved':
    }
  }

  onVitaleRead = (e: any): void => {
    switch (e.data.dataType) {
      case 'VitaleRead':
        this.handleVitaleRead(e);
        break;
      case 'VitaleReadError':
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }

  onTransactionBank = (e: any) => { }

  handleBankError = (code: string) => {
    switch (code) {
      case "StatusError":
        console.error(code + ": Opération interdite dans le status actuel");
        break;
      case "StateError":
        console.error(code + ": Opération interdite dans le state actuel");
        break;
      case "ApplicationCancelled":
        console.error(code + ": Transaction annulée par l'application");
        break;
      case "Hardware":
        console.error(code + ": Problème matériel");
        // Le status du service de paiement est mis à jour (status 'Critical')
        break;
      case "Timeout":
        console.error(code + ": Temps écoulé");
        break;
      case "FraudAttempt":
        console.error(code + ": Tentative de fraude utilisateur détectée");
        break;
      case "Jam":
        console.error(code + ": Bourrage");
        break;
      case "UnsupportedChange":
        console.error(code + ": Monnaie inconnue");
        break;
      case "CannotPayout":
        console.error(code + ": Rendu de monnaie impossible");
        break;
      default:
        console.error(code + ": Erreur non traitée");
        break;
    }
  }

  printReceipt = () => {
    // Écoute de l'événement d'impression de reçu
    this.skService.addEventListener("CashPayment", "receiptPrint", this.onReceiptPrint);
    // Impression d'un reçu
    // this.skService.printReceiptCashPayment(header, footer)
  }


  onTransactionConfirm = (e: any) => {
    // Pour le cas d'erreur de désynchro applicative, sinon géré dans onTransactionBank
    switch (e.data.dataType) {
      case "TransactionConfirmError":
        console.error(e.data.dataType + ": désynchro applicative");
        break;
    }
  }

  onTransactionCancel = (e: any) => {
    switch (e.data.dataType) {
      case "TransactionCancelled":
        /**
         * Evènement de succès d'annulation de la transaction courante
         * Champs associés:
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        break;
      case "TransactionCancelError":
        /**
         * Evènement d'échec d'annulation de la transaction courante
         * Champs associés:
         * @param {("Undefined" | "StatusError" | "StateError" | "ParamError" | "DeviceUnavailable")} e.data.code - Erreur possible lors d'une erreur d'annulation de transaction
         * @param {string} e.data.description - description erreur
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        switch (e.data.code) {
          case "Undefined":
            break;
          case "StatusError":
            break;
          case "StateError":
            break;
          case "ParamError":
            break;
          case "DeviceUnavailable":
            break;
        }
        break;
    }
  }

  onReceiptPrint = (e: any) => {
    switch (e.data.dataType) {
      case "ReceiptPrinted":
        break;
      case "ReceiptPrintError":
        this.handlePrintError(e.data.code);
        break;
    }
  }

  onCardDispense = (e: any): void => {
  }

  handleVitaleRead = (e: any): void => { }

  onCardDebit = (e: any): void => {
    switch (e.data.dataType) {
      case "CardAcquired":
        break;
      case "TransactionAuthorized":
        this.skService.addEventListener("CardPayment", "transactionConfirm", this.onTransactionConfirm);
        this.skService.confirmTransaction(e.data.confirmedAmount);
        break;
      case "CardDebited":
        this.skService.removeEventListener("CardPayment", "cardDebit", this.onCardDebit);
        break;
      case "CardDebitError":
        // Gestion des cas d'erreur
        this.handleDebitError(e.data.code);
        // traitement spécifique de la démo
        this.skService.removeEventListener("CardPayment", "cardDebit", this.onCardDebit);
        break;
    }
    this.onCardDebitEnd(e);
  }

  onCardDebitEnd = (e: any): void => {

  }

  handleDebitError = (code: string): void => {
    switch (code) {
      case "StatusError":
        console.error(code + ": Opération interdite dans le status actuel");
        break;
      case "StateError":
        console.error(code + ": Opération interdite dans le state actuel");
        break;
      case "CardMute":
        console.error(code + ": Carte muette");
        // Reproposer le paiement
        break;
      case "CardOutdated":
        console.error(code + ": Carte périmée");
        // Reproposer le paiement
        break;
      case "Refused":
        console.error(code + ": Transaction refusée");
        // Reproposer le paiement
        break;
      case "UserCancelled":
        console.error(code + ": Transaction annulée par l'utilisateur depuis le terminal");
        // Reproposer le paiement
        break;
      case "ApplicationCancelled":
        console.error(code + ": Transaction annulée par l'application");
        break;
      case "Server":
        console.error(code + ": Serveur monétique injoignable");
        // Le status du service de paiement est mis à jour (status d'erreur 'Warning' ou 'Critical', statusDetail 'Server')
        break;
      case "DeviceUnavailable":
        console.error(code + ": Terminal indisponible");
        // Le status du service de paiement est mis à jour (status 'TempUnavailable' en tant qu'avertissement, puis 'Critical')
        break;
      case "Hardware":
        console.error(code + ": Problème matériel");
        // Le status du service de paiement est mis à jour (status 'Critical')
        break;
      default:
        console.error(code + ": Erreur non traitée");
        break;
    }
  }

  onRawHtmlPrint = (e: any): any => {
    switch (e.data.dataType) {
      case 'RawHtmlPrinted':
        break;
      case 'RawHtmlPrintError':
        console.error(e.data.code + ": " + e.data.description);
        this.handlePrintError(e.data.code);
        break;
    }
  }


  formOnRawHtmlPrint(e: any) {
    console.log(e.data.dataType);
    switch (e.data.dataType) {
      case 'RawHtmlPrinted':
        console.log("Document Imprimé");
        break;
      case 'RawHtmlPrintError':
        console.error(e.data.code+ " : "+e.data.description);
        break;
    }
  }
  formOnRawPdfPrint(e: any) {
    console.log(e.data.dataType);
    switch (e.data.dataType) {
      case 'RawHtmlPrinted':
        console.log("Document Imprimé");
        break;
      case 'RawHtmlPrintError':
        console.error(e.data.code+ " : "+e.data.description);
        break;
    }
  }

  handlePrintError(code: string) {
    switch (code) {
      case "StatusError":
        console.log("StatusError");
        break;
      case "StateError":
        console.log("StateError");
        break;
      default:
        break;
    }
  }

  onPreview = (e: any) => {
    switch (e.data.dataType) {
      case 'PreviewStarted':

        // Ouverture d'un WebSocket pour récupérer les images de prévisualisation
        let previewWebsocket = new WebSocket(e.data.serverUrl);

        // Écoute de l'événement de réception d'informations par le WebSocket
        previewWebsocket.onmessage = function (preview) {
          
          // TODO
        };

        // Écoute de l'événement de fermeture du WebSocket
        previewWebsocket.onclose = function () {
        };
        break;
      case 'PreviewStopped':
        break;
      default:
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }

  onImageCapture = (e: any) => {
    switch (e.data.dataType) {
      case "ImageCaptured":
        /**
         * Evènement de succès de la capture
         * Champs associés:
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        break;
      case "ImageCaptureError":
        /**
         * Evènement d'échec de la capture
         * Champs associés:
         * @param {("None" | "Disconnected" | "SignalingError" | "SignalingState")} e.data.code - Erreur sur demande de capture d'image
         * @param {string} e.data.description - description erreur
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        switch (e.data.code) {
          case "None":
            break;
          case "Disconnected":
            break;
          case "SignalingError":
            break;
          case "SignalingState":
            break;
        }
        break;
    }
  }

  onPreviewStart = (e: any) => {
    switch (e.data.dataType) {
      case "PreviewStarted":
        /**
         * Evènementde succès du démarrage de la prévisualisation
         * Champs associés:
         * @param {string} e.data.serverUrl - Adresse du serveur Websocket  de prévisualisation
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */

        // Ouverture d'un WebSocket pour récupérer les images de prévisualisation
        let previewWebsocket = new WebSocket(e.data.serverUrl);

        // Écoute de l'événement de réception d'informations par le WebSocket
        previewWebsocket.onmessage = (preview) => {
          // TODO
        };

        // Écoute de l'événement de fermeture du WebSocket
        previewWebsocket.onclose = () => {
        };
        break;
      case "PreviewStartError":
        /**
         * Evènement d'échec du démarrage de la prévisualisation
         * Champs associés:
         * @param {("None" | "Disconnected" | "SignalingError" | "SignalingState")} e.data.code - Erreur sur demande de démarrage de prévisualisation
         * @param {string} e.data.description - description erreur
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        switch (e.data.code) {
          case "None":
            break;
          case "Disconnected":
            break;
          case "SignalingError":
            break;
          case "SignalingState":
            break;
        }
        break;
    }
  }

  onImageDocumentCapture = (e: any) => {
    switch (e.data.dataType) {
      case 'ImageCaptured':
        console.log("dataType: ImageCaptured");
        break;
      case 'ImageCaptureError':
        console.error(e.data.code + ": " + e.data.description);
        break;
    }
  }

  onPreviewStop = (e: any) => {
    switch (e.data.dataType) {
      case "PreviewStopped":
        /**
         * Evènement de succès de l'arrêt de la prévisualisation
         * Champs associés:
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        break;
      case "PreviewStopError":
        /**
         * Evènement d'échec de l'arrêt de la prévisualisation
         * Champs associés:
         * @param {("None" | "Disconnected" | "SignalingError" | "SignalingState")} e.data.code - Erreur sur demande d'arrêt de prévisualisation
         * @param {string} e.data.description - description erreur
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        switch (e.data.code) {
          case "None":
            break;
          case "Disconnected":
            break;
          case "SignalingError":
            break;
          case "SignalingState":
            break;
        }
        break;
    }
  }

  onBarcodeRead = (e: any): void => {
    switch (e.data.dataType) {
      case 'BarcodeRead':
        // traitement à préciser dans la fonction de spécification
        break;
      case 'BarcodeReadError':
        switch (e.data.code) {
          case 'StatusError':
            break;
          case 'StateError':
            break;
          case 'ConfigError':
            break;
          case 'Timeout':
            // traitement à préciser dans la fonction de spécification
            break;
        }
    }
  }

  onBarcodeReadStop = (e: any): void => {
    switch (e.data.dataType) {
      case 'BarcodeReadStopped':
        this.skService.removeEventListener("BarcodeReading_Manual", "barcodeReadStop", this.onBarcodeReadStop);
        break;
      case 'BarcodeReadStopError':
        this.skService.removeEventListener("BarcodeReading_Manual", "barcodeReadStop", this.onBarcodeReadStop);
        break;
    }
  }
}
