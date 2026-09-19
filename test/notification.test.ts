import assert from "node:assert/strict";
import test from "node:test";
import { notificationResponse, parseNotificationPayload, verifyPaymentMd5Sum } from "../src/index.js";
import type { TpayBlikAliasNotification, TpayPaymentNotification } from "../src/index.js";

const paymentBody = new URLSearchParams({
    id: "1010",
    tr_id: "TR-BRA-KGZK0X",
    tr_date: "2026-09-19 12:00:00",
    tr_crc: "order-123",
    tr_amount: "12.34",
    tr_paid: "12.34",
    tr_desc: "Test transaction",
    tr_status: "true",
    tr_error: "none",
    tr_email: "jan.kowalski@example.com",
    test_mode: "1",
    md5sum: "99e83308eb4d3c4ea0c5f84996e5169c",
}).toString();

test("parses a form encoded payment notification", () => {
    const notification = parseNotificationPayload(paymentBody) as TpayPaymentNotification;

    assert.equal(notification.tr_id, "TR-BRA-KGZK0X");
    assert.equal(notification.tr_crc, "order-123");
    assert.equal(notification.tr_status, "true");
});

test("unflattens the PHP-style nesting of BLIK alias notifications", () => {
    const body = new URLSearchParams({
        id: "1010",
        event: "ALIAS_REGISTER",
        "msg_value[value]": "TPAY_ALIAS_1",
        "msg_value[type]": "PAYID",
        "msg_value[expirationDate]": "2028-01-01",
    }).toString();

    const notification = parseNotificationPayload(body) as TpayBlikAliasNotification;

    assert.equal(notification.event, "ALIAS_REGISTER");
    assert.deepEqual(notification.msg_value, {
        value: "TPAY_ALIAS_1",
        type: "PAYID",
        expirationDate: "2028-01-01",
    });
});

test("parses JSON notifications even when the content type is missing", () => {
    const body = JSON.stringify({ type: "token_update", data: { token: "t59c2810d59285e3e0ee9d1f1eda1c2f4" } });

    assert.deepEqual(parseNotificationPayload(body), JSON.parse(body));
});

test("answers form notifications with TRUE and JSON notifications with a result object", () => {
    assert.equal(notificationResponse(parseNotificationPayload(paymentBody)), "TRUE");
    assert.equal(notificationResponse({ type: "token_update", data: { token: "abc" } }), '{"result":true}');
});

test("accepts a correct md5sum and rejects a wrong one", () => {
    const notification = parseNotificationPayload(paymentBody) as TpayPaymentNotification;

    verifyPaymentMd5Sum(notification, "secret-code");
    assert.throws(() => verifyPaymentMd5Sum(notification, "wrong-code"), /Invalid md5sum/);
    assert.throws(() => verifyPaymentMd5Sum({ ...notification, md5sum: "" }, "secret-code"), /Invalid md5sum/);
});
