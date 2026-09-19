# @fanth/tpay-sdk

TypeScript SDK for the [Tpay Open API](https://api.tpay.com/) ([docs](https://docs-api.tpay.com/)).

Every endpoint of the Tpay Open API is covered, with request/response types generated from the official OpenAPI specification.

## Install

```bash
npm install @fanth/tpay-sdk
```

With [pnpm](https://pnpm.io/):

```bash
pnpm add @fanth/tpay-sdk
```

## Usage

See examples in the [examples](./examples) directory.

```ts
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
    description: "Order #1",
    hiddenDescription: "order-123",
    payer: { email: "jan.kowalski@example.com", name: "Jan Kowalski" },
    callbacks: {
        payerUrls: { success: "https://example.com/ok", error: "https://example.com/error" },
        notification: { url: "https://example.com/tpay/notification" },
    },
});

// Redirect the payer here
console.log(transaction.transactionPaymentUrl);
```

Credentials are generated in the Merchant Panel under _Integration -> API_. The access token is fetched on the
first request and cached until it expires.

Failed requests reject with axios's own `AxiosError`, so you can use `axios.isAxiosError()` to inspect
`error.response.data` (a `TpayBadRequestResponse` for most endpoints).

### Notifications

Tpay POSTs several kinds of notification to your callback URL: transaction settlement, card tokenization,
card token status change, BLIK alias lifecycle, marketplace transactions and recurring charges. Some are sent
as `application/x-www-form-urlencoded`, some as `application/json`, and they expect different answers.

`parseNotification` handles all of them: it verifies the mandatory `X-JWS-Signature` (RS256 over the raw body,
against the certificate named by the `x5u` header, which is itself verified against the Tpay root CA and then
cached) and returns a typed discriminated union. It throws if any of that does not check out.

The JWS signature already covers the whole body, so the legacy `md5sum` is optional. Set `securityCode`
in the config (Merchant Panel -> Notifications -> Security) and payment notifications get their
`md5sum` checked too - `md5(id + tr_id + tr_amount + tr_crc + securityCode)`. Leave it out to skip that.

```ts
import { TpayClient, notificationResponse } from "@fanth/tpay-sdk";

// e.g. a Next.js route handler / any Request-based HTTP framework
export async function POST(request: Request) {
    const notification = await client.parseNotification(request);

    if ("tr_id" in notification && notification.tr_status === "true") {
        // paid - notification.tr_crc holds the hiddenDescription you sent
    } else if ("event" in notification) {
        // BLIK alias registered, updated, expired or removed
    } else if ("recurringId" in notification) {
        // recurring charge
    } else if (notification.type === "token_update") {
        // card token status changed
    }

    // Tpay resends the notification unless it gets exactly this body with HTTP 200
    return new Response(notificationResponse(notification), { status: 200 });
}
```

See [examples/03_notification.ts](./examples/03_notification.ts) for every branch.

If your framework hands you the raw body instead of a `Request`, use
`client.parseNotificationBody(body, jwsSignature, contentType)`. If you verify the signature elsewhere
(e.g. at the edge), `parseNotificationPayload(body, contentType)` just parses, and
`verifyPaymentMd5Sum(notification, securityCode)` checks the checksum on its own.

> Note: `parseNotification` reads the body via `request.text()`, so pass it the raw `Request` before any other
> code consumes the body - the signature is computed over the exact bytes Tpay sent.

## API

Endpoints are grouped on the client the same way the Tpay docs group them.

| Method                                                                                        | Endpoint                                       |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `client.getAccessToken()` / `client.getValidAccessToken()`                                    | `POST /oauth/auth`                             |
| `client.getTokenInfo()`                                                                       | `GET /oauth/tokeninfo`                         |
| `client.parseNotification(request)` / `client.parseNotificationBody(body, jws, contentType?)` | notification webhook                           |
| `client.transactions.create(data)`                                                            | `POST /transactions`                           |
| `client.transactions.list(params?)`                                                           | `GET /transactions`                            |
| `client.transactions.get(id)`                                                                 | `GET /transactions/{id}`                       |
| `client.transactions.pay(id, data)`                                                           | `POST /transactions/{id}/pay`                  |
| `client.transactions.createQr(ulid, data?)`                                                   | `POST /transactions/{ulid}/qr`                 |
| `client.transactions.listRefunds(id, params?)`                                                | `GET /transactions/{id}/refunds`               |
| `client.transactions.refund(id, data?)`                                                       | `POST /transactions/{id}/refunds`              |
| `client.transactions.cancel(id)`                                                              | `POST /transactions/{id}/cancel`               |
| `client.transactions.cancelLegacy(id)` _(deprecated)_                                         | `GET /transactions/{id}/cancel`                |
| `client.transactions.bankGroups(params?)`                                                     | `GET /transactions/bank-groups`                |
| `client.transactions.channels()`                                                              | `GET /transactions/channels`                   |
| `client.refunds.list(params?)`                                                                | `GET /refunds`                                 |
| `client.refunds.create(data)`                                                                 | `POST /refunds`                                |
| `client.refunds.get(refundId)`                                                                | `GET /refunds/{refundId}`                      |
| `client.tokenization.create(data)`                                                            | `POST /tokens`                                 |
| `client.tokenization.get(tokenValue)`                                                         | `GET /tokens/{tokenValue}`                     |
| `client.tokenization.delete(tokenValue)`                                                      | `DELETE /tokens/{tokenValue}`                  |
| `client.blik.createAlias(data)`                                                               | `POST /blik/alias`                             |
| `client.blik.getAlias(alias, aliasType)`                                                      | `GET /blik/alias/{alias}`                      |
| `client.blik.deleteAlias(alias, data)`                                                        | `DELETE /blik/alias/{alias}`                   |
| `client.wallet.initApplePay(data)`                                                            | `POST /wallet/applepay/init`                   |
| `client.accounts.list(params?)`                                                               | `GET /accounts`                                |
| `client.accounts.create(data)`                                                                | `POST /accounts`                               |
| `client.accounts.get(accountId)`                                                              | `GET /accounts/{accountId}`                    |
| `client.accounts.categories()`                                                                | `GET /accounts/category`                       |
| `client.accounts.category(categoryId)`                                                        | `GET /accounts/category/{categoryId}`          |
| `client.accounts.legalForms()`                                                                | `GET /accounts/legalForm`                      |
| `client.accounts.legalForm(legalFormId)`                                                      | `GET /accounts/legalForm/{legalFormId}`        |
| `client.accounts.mccs()`                                                                      | `GET /accounts/mcc`                            |
| `client.accounts.pos()`                                                                       | `GET /accounts/pos`                            |
| `client.accounts.documentTypes()`                                                             | `GET /accounts/document`                       |
| `client.accounts.documentType(documentTypeId)`                                                | `GET /accounts/document/{documentTypeId}`      |
| `client.accounts.createMerchant(data)`                                                        | `POST /v1/accounts/merchant`                   |
| `client.marketplace.createTransaction(data)`                                                  | `POST /marketplace/v1/transaction`             |
| `client.marketplace.getTransaction(id, params?)`                                              | `GET /marketplace/v1/transaction/{id}`         |
| `client.marketplace.payTransaction(id, data)`                                                 | `POST /marketplace/v1/transaction/{id}/pay`    |
| `client.marketplace.refundTransaction(id, data)`                                              | `POST /marketplace/v1/transaction/{id}/refund` |
| `client.marketplace.cancelTransaction(id)`                                                    | `POST /marketplace/v1/transaction/{id}/cancel` |
| `client.marketplace.bankGroups(merchantIds?)`                                                 | `GET /marketplace/v1/bank-groups`              |
| `client.collect.listBankAccounts(params?)`                                                    | `GET /collect/bank-accounts`                   |
| `client.collect.createBankAccount(data)`                                                      | `POST /collect/bank-accounts`                  |
