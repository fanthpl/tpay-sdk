import "dotenv/config";
import { TpayClient } from "@fanth/tpay-sdk";

const client = new TpayClient({
    clientId: process.env.TPAY_CLIENT_ID!,
    clientSecret: process.env.TPAY_CLIENT_SECRET!,
    sandbox: process.env.TPAY_IS_SANDBOX === "true",
});

// BLIK is charged on-site: create the transaction first, then submit the 6-digit code
const transaction = await client.transactions.create({
    amount: 12.34,
    currency: "PLN",
    description: "Test transaction",
    payer: {
        email: "jan.kowalski@example.com",
        name: "Jan Kowalski",
    },
});

const payment = await client.transactions.pay(transaction.transactionId, {
    groupId: 150, // BLIK
    blikPaymentData: {
        blikToken: "777123",
    },
});

console.log(payment.status, payment.payments.status);
