/**
 * @title  PAIEMENT PAR CARTE BANCAIRE
 * @description Transaction bancaire standard
 * @service CardPayment (CardTPA)
 * @service ReceiptPrinting 
*/

/**
 * Fonction de lancement d'un débit de X centimes
 * @param {number} amountInCents - Default: 100 - Montant en centimes
 * @param {string} refTransaction - Default: ref-deb-0000 - Référence de la transaction
 * @param {string} refShoppingCart - Default: ticket-1234 - Référence du panier
 */
function start1() {
    let amountInCents = 100;
    let refTransaction = "ref-deb-0000";
    let refShoppingCart = "ticket-123";
    Kiosk.CardPayment.addEventListener("cardDebit", onCardDebit);
    console.log("START - lancement d'une transaction de "+amountInCents/100+"€")
    Kiosk.CardPayment.debitCard({
        amountInCents: amountInCents,
        refTransaction: refTransaction,
        refShoppingCart: refShoppingCart
    });
}
function stop1() {
    console.log("END - Annulation de la transaction");
    // Fin d'écoute de l'événement de débit
    Kiosk.CardPayment.removeEventListener("cardDebit", onCardDebit);
    Kiosk.CardPayment.cancelTransaction();
}
/**
 * Fonction de rappel associée à l'événement de débit de carte bancaire
 */
function onCardDebit(e) {
    switch (e.data.dataType) {
        case "CardDebitError":
            console.log("ERROR - " + e.data.dataType + " " + e.data.code);
            Kiosk.CardPayment.removeEventListener("cardDebit", onCardDebit);
            break;
        case "CardDebited":
            console.log("END - Transaction terminée (" + e.data.refTransaction + ")");
            Kiosk.CardPayment.removeEventListener("cardDebit", onCardDebit);
            break;
        default:
            console.log("END - " + e.data.dataType + " " + e.data.code);
            break;
    }
}

/**
 * Confirmation de transaction
 */
function start2() {
    console.log("START - confirmation de transaction");
    Kiosk.CardPayment.addEventListener("transactionConfirm", onTransactionConfirm);

    Kiosk.CardPayment.confirmTransaction({
        "confirmAmountInCents": Kiosk.CardPayment.currentTransaction.amountInCents
    });
}

/**
 * Annulation de la transaction
 */
function stop2() {
    console.log("END - Annulation de la transaction");
    Kiosk.CardPayment.removeEventListener("transactionConfirm", onTransactionConfirm);
    Kiosk.CardPayment.cancelTransaction();
}


/**
 * Impression du reçu de transaction
 */
function start3() {
    // Écoute de l'événement d'impression de reçu bancaire
    Kiosk.CardPayment.addEventListener("receiptPrint", onReceiptPrint);

    console.log("START - impression du reçu");
    // Impression d'un reçu, au format utf-8
    Kiosk.CardPayment.printReceipt({
        "htmlHeader": "<h1 style='font-size: 20px; font-weight:bold; font-family: Tahoma, sans-serif; text-align: center;'>Votre reçu</h1><h2  style='font-size: 15px; font-weight:bold; font-family: Tahoma, sans-serif; text-align: center;'>Panier " + Kiosk.CardPayment.currentTransaction.refShoppingCart + "</h2><div><pre style='font-size: 14px; font-family: Tahoma, sans-serif;'>",
        "htmlFooter": "</pre></div><hr><p style='font-family: Tahoma; text-align: center;'>Au revoir</p>"
    });
}

/**
 * Annulation de l'impression du reçu
 */
function stop3() {
    console.log("END - Annulation de l'impression");
    Kiosk.CardPayment.removeEventListener("receiptPrint", onReceiptPrint);
}

/**
 * Fonction de rappel associée à l'événement de confirmation de transaction
 */
function onTransactionConfirm(e) {
    // Pour le cas d'erreur de désynchro applicative, sinon géré dans onCardDebit
    switch (e.data.dataType) {
        case "TransactionConfirmError":
            console.log("ERROR - " + e.data.code + " " + e.data.dataType);
            break;
    }

    // Fin d'écoute de l'événement de confirmation
    Kiosk.CardPayment.removeEventListener("transactionConfirm", onTransactionConfirm);
}

/**
 * Fonction de rappel associée à l'événement d'impression de reçu bancaire
 */
function onReceiptPrint(e) {
    switch (e.data.dataType) {
        case "ReceiptPrinted":
            console.log("END - Reçu imprimé");
            break;
        case "ReceiptPrintError":
            console.log("ERROR - "+ e.data.dataType);
            handlePrintError(e.data.code);
            break;
    }
    // Fin d'écoute de l'événement d'impression
    Kiosk.CardPayment.removeEventListener("receiptPrint", onReceiptPrint);
}

/**
 * Gestion d'une erreur d'impression de reçu selon son code
 */
function handlePrintError(code) {
    switch (code) {
        case "StatusError":
            console.log("ERROR - Opération interdite dans le status actuel de l'impression");
            break;
        case "StateError":
            console.log("ERROR - Opération interdite dans le state actuel du paiement");
            break;
        default:
            console.log(code + ": ERROR d'impression de reçu");
            break;
    }
}
