import { Injectable } from '@angular/core';

declare var Kiosk: any;
@Injectable({
  providedIn: 'root'
})
export class SoftKioskService {

  constructor() { }

  onStatusChange = (e: any): void => {
    console.log("Événement statusChange");
    switch (e.data.dataType) {
      case "StatusChanged":
        /**
         * Sur changement de status
         * Champs associés:
         * @param {("Ok" | "Warning" | "Critical" | "Unknown" | "TempUnavailable")} e.data.status - Statut.
         * @param {object} e.data.statusDetail - Statut détaillé.
         * @param {string} e.data.statusDescription - Description du statut.
         * @param {string} e.data.dataType - Type de l'événement (sa classe).
         */
        console.log(e.data.status);
        console.log("DataType StatusChanged");
        break;
    }
  }

  addEventListener(srvName: string, evtName: string, callback: any) {
    Kiosk[srvName].addEventListener(evtName, callback);
  }

  addKioskEventListener() {
    Kiosk.addEventListener("statusChange", this.onStatusChange);
  }

  removeKioskEventListener() {
    Kiosk.removeEventListener("statusChange", this.onStatusChange);
  }

  removeEventListener(srvName: string, evtName: string, callback: any) {
    Kiosk[srvName].removeEventListener(evtName, callback);
  }

  getKioskStatusDetail() {
    return Kiosk.status;
  }

  getKioskStateDetail() {
    return Kiosk.state;
  }

  getServiceStatusDetail(srvname: string) {
    return Kiosk[srvname].statusDetail;
  }

  getServiceState(srvname: string) {
    return Kiosk[srvname].state;
  }

  getServiceStatus(srvname: string): string {
    return Kiosk[srvname].status;
  }

  addStatusServicesEventListener(srvName: string, callback: any) {
    Kiosk[srvName].addEventListener("statusChange", callback);
  }

  removeStatusServicesEventListener(srvName: string, evtName: string, callback: any) {
    Kiosk[srvName].removeEventListener(evtName, callback);
  }

  cardPaymentDebit(payArgs: any) {
    Kiosk.CardPayment.debitCard(payArgs);
  }

  cardDispensingDispense() {
    Kiosk.CardDispensing.dispenseCard();
  }

  cancelTransaction() {
    Kiosk.CardPayment.cancelTransaction();
  }

  startDocumentPreview() {
    Kiosk.DocumentScanning.startPreview();
  }

  captureImageDocument() {
    Kiosk.DocumentScanning.captureImage();
  }

  lastCaptureImage(): string {
    return Kiosk.DocumentScanning.lastCapture;
  }

  lastCameraCapture(): string {
    return Kiosk.CameraShooting.lastCapture;
  }

  lastCameraCaptureRaw(): string {
    return Kiosk.CameraShooting.lastCapture.raw;
  }

  lastCaptureImageRaw(): string {
    return Kiosk.DocumentScanning.lastCapture.raw;
  }

  captureCameraImage(): void {
    Kiosk.CameraShooting.captureImage();
  }

  startCameraPreview(): void {
    Kiosk.CameraShooting.startPreview();
  }

  stopCameraPreview(): void {
    Kiosk.CameraShooting.stopPreview();
  }

  stopDocumentPreview() {
    Kiosk.DocumentScanning.stopPreview();
  }

  bankTransaction(amountInCents: number, refTransaction: string, refShoppingCart: string) {
    Kiosk.CashPayment.bankTransaction({
      amountInCents,
      refTransaction,
      refShoppingCart
    });
  }

  addEventApplication(appName: string, information: string) {
    Kiosk[appName].addEvent({ "information": information });
  }

  barcodeReadingManual() {
    Kiosk.BarcodeReading.readBarcode();
  }

  stopBarcodeReadingManual() {
    Kiosk.BarcodeReading.stopReadBarcode();
  }

  receiptPrintingPrintRawHtml(htmlReceipt: string) {
    Kiosk.ReceiptPrinting.printRawHtml({
      html: htmlReceipt
    });
  }

  ticketPrintingPrintRawHtml(htmlReceipt: string) {
    Kiosk.TicketPrinting.printRawHtml({
      "html": htmlReceipt
    })
  }

  ticketPrintingPrintRawPdf(rawPdf: string) {
    Kiosk.TicketPrinting.printRawPdf({
      "raw": rawPdf
    })
  }

  openSession() {
    Kiosk.Session.close({ information: "Ouverture de session" });
  }

  hideKbd() {
    Kiosk.OnscreenKbd.hide();
  }

  showKbd(layout: string) {
    Kiosk.OnscreenKbd.show(layout);
  }

  restartKiosk = () => {
    Kiosk.restart();
  }

 
  confirmTransaction = (confirmedAmount: number) => {
    Kiosk.CardPayment.confirmTransaction({
      "confirmAmountInCents": confirmedAmount
    });
  }

  getInitialAmountFromCurrentTransaction(): number {
    return Kiosk.CashPayment.currentTransaction.initialAmount
  }

  getConfirmedAmount(): number {
    return Kiosk.CashPayment.currentTransaction.confirmedAmount;
  }

  readVitale(valTimeout: number) {
    Kiosk.VitaleCardReading.readVitale({ timeout: valTimeout });
  }

  checkCardPresence() {
    Kiosk.VitaleCardReading.checkCardPresence();
  }

  payPrintReceipt(contentPrint: any) {
    Kiosk.CardPayment.printReceipt(contentPrint);
  }

  getServicesList() {
    return Kiosk.services;
  }

  getStatus(service: string) {
    return Kiosk[service].status;
  }

  getState(service: string) {
    return Kiosk[service].state;
  }

  getCustomerData(): any {
    return Kiosk.customerData;
  }

  getCustomerDataKeyName(): string {
    let customerData = this.getCustomerData();
    let customerDataKey = Object.keys(customerData)[0];
    return customerDataKey;
  }

  getValueFromCustomerData(): string {
    let customerData = Kiosk.customerData;
    return customerData['demoName'];
  }

  printReceiptCashPayment = (header: string, footer: string) => {
    Kiosk.CashPayment.printReceipt({
      "htmlHeader": header,
      "htmlFooter": footer
    });
  }

  setAppStatus(appName: string, appStatus: string, appStatusDetail: string, appStatusDescription: string): void {
    Kiosk[appName].setApplicationStatus({
      "status": appStatus,
      "statusDetail": appStatusDetail,
      "statusDescription": appStatusDescription
    });
  }

  activeKbd(value: boolean) {
    Kiosk.OnscreenKbd.autoShow = value;
  }

  checkKioskPresence(): boolean {
    return typeof Kiosk !== "undefined";
  }

  checkIfServiceExist(srvName: string): boolean {
    return Kiosk.hasOwnProperty(srvName);
  }

  getServiceStatusObject(srvName: string): string {
    return Kiosk[srvName].statusObject;
  }

  getSourceList(): any {
    return Kiosk.DocumentPrinting.sourcesList;
  }

  documentPrintingPrintRawHtml(html: string) {
    Kiosk.DocumentPrinting.printRawHtml({ 
      "html": html, 
      source: this.getSourceList()[0] 
    });
  }

  documentPrintingPrintRawPdf(pdf: string) {
    Kiosk.DocumentPrinting.printRawPdf({ 
      "raw": pdf, 
      source: this.getSourceList()[0] 
    });
  }

}
