import "dotenv/config";
import { TpayClient, notificationResponse } from "@fanth/tpay-sdk";

const client = new TpayClient({
    clientId: process.env.TPAY_CLIENT_ID!,
    clientSecret: process.env.TPAY_CLIENT_SECRET!,
    sandbox: process.env.TPAY_IS_SANDBOX === "true",
});

// Any Request-based HTTP framework: Next.js route handler, Hono, Cloudflare Workers, ...
export async function POST(request: Request) {
    let notification;
    try {
        notification = await client.parseNotification(request);
    } catch (error) {
        console.error("Rejected a Tpay notification", error);
        return new Response("FALSE", { status: 400 });
    }

    if ("tr_id" in notification) {
        if (notification.tr_status === "true") {
            // Paid - notification.tr_crc holds the hiddenDescription you sent
            console.log("Paid", notification.tr_crc, notification.tr_paid);
        }
    } else if ("event" in notification) {
        console.log("BLIK alias", notification.event, notification.msg_value.value);
    } else if ("recurringId" in notification) {
        console.log("Recurring charge", notification.recurringId, notification.status);
    } else {
        switch (notification.type) {
            case "tokenization":
            case "tokenization_eisop":
                console.log("Card tokenized", notification.data.token);
                break;
            case "token_update":
                console.log("Card token changed", notification.data.token);
                break;
            case "marketplace_transaction":
                console.log("Marketplace paid", notification.data.transactionId);
                break;
        }
    }

    // Tpay resends the notification unless it gets exactly this body with HTTP 200
    return new Response(notificationResponse(notification), { status: 200 });
}
