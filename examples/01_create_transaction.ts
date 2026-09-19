import "dotenv/config";
import { TpayClient } from "@fanth/tpay-sdk";

const client = new TpayClient({
    clientId: process.env.TPAY_CLIENT_ID!,
    clientSecret: process.env.TPAY_CLIENT_SECRET!,
    sandbox: process.env.TPAY_IS_SANDBOX === "true",
    // Optional: Settings -> Notifications -> Security Code. Only used to verify the md5sum of payment notifications
    securityCode: process.env.TPAY_SECURITY_CODE,
});

const transaction = await client.transactions.create({
    amount: 12.34,
    currency: "PLN",
    description: "Test transaction",
    hiddenDescription: "order-123",
    payer: {
        email: "jan.kowalski@example.com",
        name: "Jan Kowalski",
    },
    callbacks: {
        payerUrls: {
            success: "https://example.com/payment_success",
            error: "https://example.com/payment_error",
        },
        notification: {
            url: "https://example.com/tpay/notification",
        },
    },
});

// Redirect the payer here to pick a payment method and pay
console.log(transaction.transactionPaymentUrl);
