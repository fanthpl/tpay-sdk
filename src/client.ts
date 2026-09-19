import axios, { type AxiosInstance } from "axios";
import crypto, { X509Certificate } from "crypto";
import type {
    TpayAccountCreatedResponse,
    TpayAccountDetails,
    TpayAccountListResponse,
    TpayAccountRequest,
    TpayAccountsPosResponse,
    TpayApplePayInitRequest,
    TpayApplePayInitResponse,
    TpayBankAccountCreatedResponse,
    TpayBankGroupsParams,
    TpayBankGroupsResponse,
    TpayBlikAliasDetailsResponse,
    TpayCardTokenCreatedResponse,
    TpayCardTokenResponse,
    TpayCategoryListResponse,
    TpayCategoryResponse,
    TpayChannelsResponse,
    TpayCollectBankAccountListResponse,
    TpayCreateBankAccountRequest,
    TpayCreateBlikAliasRequest,
    TpayCreateBlikAliasResponse,
    TpayCreateCardTokenRequest,
    TpayCreateMarketplaceTransactionRequest,
    TpayCreateMerchantRequest,
    TpayCreateRefundRequest,
    TpayCreateTransactionRefundRequest,
    TpayCreateTransactionRequest,
    TpayDeleteBlikAliasRequest,
    TpayDocumentListResponse,
    TpayDocumentResponse,
    TpayLegalFormListResponse,
    TpayLegalFormResponse,
    TpayLoginResponse,
    TpayMarketplaceBankGroupsResponse,
    TpayMarketplacePaymentRequest,
    TpayMarketplaceRefundRequest,
    TpayMarketplaceRefundResponse,
    TpayMarketplaceTransactionCreatedResponse,
    TpayMarketplaceTransactionResponse,
    TpayMccListResponse,
    TpayMerchantCreatedResponse,
    TpayNotification,
    TpayPaginationParams,
    TpayPay,
    TpayRefundCreatedResponse,
    TpayRefundListParams,
    TpayRefundListResponse,
    TpayRefundResponse,
    TpayTokenInfoResponse,
    TpayTransaction,
    TpayTransactionCreatedResponse,
    TpayTransactionListParams,
    TpayTransactionListResponse,
    TpayTransactionQrRequest,
    TpayTransactionRefundsResponse,
} from "./types.js";

export interface TpayConfig {
    /** Open API client id, generated in the Merchant Panel (Integration -> API). */
    clientId: string;
    /** Open API client secret. */
    clientSecret: string;
    /** Use the sandbox environment (default: false). */
    sandbox?: boolean;
}

const ACCESS_TOKEN_EXPIRY_MARGIN_SECONDS = 60;
const DEFAULT_ACCESS_TOKEN_LIFETIME_SECONDS = 7200;

const PRODUCTION_CERTIFICATE_PREFIX = "https://secure.tpay.com";
const SANDBOX_CERTIFICATE_PREFIX = "https://secure.sandbox.tpay.com";

/** Notification signing certificates, keyed by their `x5u` URL. Dropped when a signature fails. */
const certificateCache = new Map<string, X509Certificate>();

async function fetchCertificate(url: string): Promise<X509Certificate> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Could not fetch the Tpay certificate from ${url}: HTTP ${response.status}`);
    }
    return new X509Certificate(await response.text());
}

/** Fetches the notification signing certificate and checks that it was issued by the Tpay root CA. */
async function getTpayCertificate(x5u: string, rootCaUrl: string): Promise<X509Certificate> {
    const cached = certificateCache.get(x5u);
    if (cached) return cached;

    const [certificate, rootCa] = await Promise.all([fetchCertificate(x5u), fetchCertificate(rootCaUrl)]);

    const now = Date.now();
    if (now < Date.parse(certificate.validFrom) || now > Date.parse(certificate.validTo)) {
        throw new Error("The Tpay notification certificate is not valid at this time");
    }
    if (!certificate.verify(rootCa.publicKey)) {
        throw new Error("The Tpay notification certificate was not issued by the Tpay root CA");
    }

    certificateCache.set(x5u, certificate);
    return certificate;
}

/** `client.transactions` - https://api.tpay.com/#tag/Transactions */
export class TpayTransactionsApi {
    constructor(private readonly api: AxiosInstance) {}

    /**
     * Creates a new transaction. Omit `pay` to get a `transactionPaymentUrl` to redirect the payer to.
     * POST /transactions
     */
    async create(data: TpayCreateTransactionRequest): Promise<TpayTransactionCreatedResponse> {
        const response = await this.api.post<TpayTransactionCreatedResponse>("/transactions", data);
        return response.data;
    }

    /**
     * Fetches a list of transactions.
     * GET /transactions
     */
    async list(params?: TpayTransactionListParams): Promise<TpayTransactionListResponse> {
        const response = await this.api.get<TpayTransactionListResponse>("/transactions", { params });
        return response.data;
    }

    /**
     * Fetches details and status of a single transaction.
     * GET /transactions/{transactionId}
     */
    async get(transactionId: string): Promise<TpayTransaction> {
        const response = await this.api.get<TpayTransaction>(`/transactions/${encodeURIComponent(transactionId)}`);
        return response.data;
    }

    /**
     * Submits payment details for a transaction created without `pay` (for selected payment methods).
     * POST /transactions/{transactionId}/pay
     */
    async pay(transactionId: string, data: TpayPay): Promise<TpayTransactionCreatedResponse> {
        const response = await this.api.post<TpayTransactionCreatedResponse>(
            `/transactions/${encodeURIComponent(transactionId)}/pay`,
            data
        );
        return response.data;
    }

    /**
     * Generates a QR code containing a redirection to the paywall of the given transaction.
     * Returns the raw image bytes; the format is chosen with `data.outputType`.
     * POST /transactions/{transactionUlid}/qr
     */
    async createQr(transactionUlid: string, data: TpayTransactionQrRequest = {}): Promise<ArrayBuffer> {
        const response = await this.api.post<ArrayBuffer>(`/transactions/${encodeURIComponent(transactionUlid)}/qr`, data, {
            responseType: "arraybuffer",
        });
        return response.data;
    }

    /**
     * Fetches the list of refunds for the given transaction.
     * GET /transactions/{transactionId}/refunds
     */
    async listRefunds(
        transactionId: string,
        params?: TpayPaginationParams & { from?: string; to?: string }
    ): Promise<TpayTransactionRefundsResponse> {
        const response = await this.api.get<TpayTransactionRefundsResponse>(
            `/transactions/${encodeURIComponent(transactionId)}/refunds`,
            { params }
        );
        return response.data;
    }

    /**
     * Refunds the given transaction in full (empty body) or in part (`{ amount }`).
     * POST /transactions/{transactionId}/refunds
     */
    async refund(transactionId: string, data: TpayCreateTransactionRefundRequest = {}): Promise<TpayTransactionRefundsResponse> {
        const response = await this.api.post<TpayTransactionRefundsResponse>(
            `/transactions/${encodeURIComponent(transactionId)}/refunds`,
            data
        );
        return response.data;
    }

    /**
     * Cancels a pending transaction.
     * POST /transactions/{transactionId}/cancel
     */
    async cancel(transactionId: string): Promise<void> {
        await this.api.post(`/transactions/${encodeURIComponent(transactionId)}/cancel`);
    }

    /**
     * Cancels a pending transaction.
     * GET /transactions/{transactionId}/cancel
     *
     * @deprecated Use `cancel()`, which calls the same endpoint with POST.
     */
    async cancelLegacy(transactionId: string): Promise<void> {
        await this.api.get(`/transactions/${encodeURIComponent(transactionId)}/cancel`);
    }

    /**
     * Fetches the list of available bank groups (PayByLink).
     * GET /transactions/bank-groups
     */
    async bankGroups(params?: TpayBankGroupsParams): Promise<TpayBankGroupsResponse> {
        const response = await this.api.get<TpayBankGroupsResponse>("/transactions/bank-groups", { params });
        return response.data;
    }

    /**
     * Fetches the list of available payment channels.
     * GET /transactions/channels
     */
    async channels(): Promise<TpayChannelsResponse> {
        const response = await this.api.get<TpayChannelsResponse>("/transactions/channels");
        return response.data;
    }
}

/** `client.refunds` - https://api.tpay.com/#tag/Refunds */
export class TpayRefundsApi {
    constructor(private readonly api: AxiosInstance) {}

    /**
     * Fetches a list of refunds.
     * GET /refunds
     */
    async list(params?: TpayRefundListParams): Promise<TpayRefundListResponse> {
        const response = await this.api.get<TpayRefundListResponse>("/refunds", { params });
        return response.data;
    }

    /**
     * Creates a new refund based on a card token.
     * POST /refunds
     */
    async create(data: TpayCreateRefundRequest): Promise<TpayRefundCreatedResponse> {
        const response = await this.api.post<TpayRefundCreatedResponse>("/refunds", data);
        return response.data;
    }

    /**
     * Fetches the status of a single refund request.
     * GET /refunds/{refundId}
     */
    async get(refundId: string): Promise<TpayRefundResponse> {
        const response = await this.api.get<TpayRefundResponse>(`/refunds/${encodeURIComponent(refundId)}`);
        return response.data;
    }
}

/** `client.tokenization` - https://api.tpay.com/#tag/Tokenization */
export class TpayTokenizationApi {
    constructor(private readonly api: AxiosInstance) {}

    /**
     * Requests creation of a new card token without processing a payment.
     * POST /tokens
     */
    async create(data: TpayCreateCardTokenRequest): Promise<TpayCardTokenCreatedResponse> {
        const response = await this.api.post<TpayCardTokenCreatedResponse>("/tokens", data);
        return response.data;
    }

    /**
     * Fetches details of a card token.
     * GET /tokens/{tokenValue}
     */
    async get(tokenValue: string): Promise<TpayCardTokenResponse> {
        const response = await this.api.get<TpayCardTokenResponse>(`/tokens/${encodeURIComponent(tokenValue)}`);
        return response.data;
    }

    /**
     * Deletes a card token - call it when the customer removes the stored card.
     * DELETE /tokens/{tokenValue}
     */
    async delete(tokenValue: string): Promise<void> {
        await this.api.delete(`/tokens/${encodeURIComponent(tokenValue)}`);
    }
}

/** `client.blik` - https://api.tpay.com/#tag/Blik */
export class TpayBlikApi {
    constructor(private readonly api: AxiosInstance) {}

    /**
     * Requests establishing of a new BLIK alias without processing a payment.
     * POST /blik/alias
     */
    async createAlias(data: TpayCreateBlikAliasRequest): Promise<TpayCreateBlikAliasResponse> {
        const response = await this.api.post<TpayCreateBlikAliasResponse>("/blik/alias", data);
        return response.data;
    }

    /**
     * Fetches details of a previously established BLIK alias.
     * GET /blik/alias/{alias}
     */
    async getAlias(alias: string, aliasType: "UID" | "PAYID"): Promise<TpayBlikAliasDetailsResponse> {
        const response = await this.api.get<TpayBlikAliasDetailsResponse>(`/blik/alias/${encodeURIComponent(alias)}`, {
            params: { aliasType },
        });
        return response.data;
    }

    /**
     * Requests deletion of a previously established BLIK alias.
     * DELETE /blik/alias/{alias}
     */
    async deleteAlias(alias: string, data: TpayDeleteBlikAliasRequest): Promise<void> {
        await this.api.delete(`/blik/alias/${encodeURIComponent(alias)}`, { data });
    }
}

/** `client.wallet` - https://api.tpay.com/#tag/Wallet */
export class TpayWalletApi {
    constructor(private readonly api: AxiosInstance) {}

    /**
     * Initiates a new Apple Pay session.
     * POST /wallet/applepay/init
     */
    async initApplePay(data: TpayApplePayInitRequest): Promise<TpayApplePayInitResponse> {
        const response = await this.api.post<TpayApplePayInitResponse>("/wallet/applepay/init", data);
        return response.data;
    }
}

/** `client.accounts` - https://api.tpay.com/#tag/Accounts (partner API) */
export class TpayAccountsApi {
    constructor(private readonly api: AxiosInstance) {}

    /**
     * Fetches the list of the merchant's accounts.
     * GET /accounts
     */
    async list(params?: TpayPaginationParams): Promise<TpayAccountListResponse> {
        const response = await this.api.get<TpayAccountListResponse>("/accounts", { params });
        return response.data;
    }

    /**
     * Creates a new account.
     * POST /accounts
     */
    async create(data: TpayAccountRequest): Promise<TpayAccountCreatedResponse> {
        const response = await this.api.post<TpayAccountCreatedResponse>("/accounts", data);
        return response.data;
    }

    /**
     * Fetches details of a single account.
     * GET /accounts/{accountId}
     */
    async get(accountId: string): Promise<TpayAccountDetails> {
        const response = await this.api.get<TpayAccountDetails>(`/accounts/${encodeURIComponent(accountId)}`);
        return response.data;
    }

    /**
     * Fetches the list of account categories.
     * GET /accounts/category
     */
    async categories(): Promise<TpayCategoryListResponse> {
        const response = await this.api.get<TpayCategoryListResponse>("/accounts/category");
        return response.data;
    }

    /**
     * Fetches a single account category.
     * GET /accounts/category/{categoryId}
     */
    async category(categoryId: string): Promise<TpayCategoryResponse> {
        const response = await this.api.get<TpayCategoryResponse>(`/accounts/category/${encodeURIComponent(categoryId)}`);
        return response.data;
    }

    /**
     * Fetches the list of account legal forms.
     * GET /accounts/legalForm
     */
    async legalForms(): Promise<TpayLegalFormListResponse> {
        const response = await this.api.get<TpayLegalFormListResponse>("/accounts/legalForm");
        return response.data;
    }

    /**
     * Fetches a single legal form.
     * GET /accounts/legalForm/{legalFormId}
     */
    async legalForm(legalFormId: string): Promise<TpayLegalFormResponse> {
        const response = await this.api.get<TpayLegalFormResponse>(`/accounts/legalForm/${encodeURIComponent(legalFormId)}`);
        return response.data;
    }

    /**
     * Fetches the list of account MCCs.
     * GET /accounts/mcc
     */
    async mccs(): Promise<TpayMccListResponse> {
        const response = await this.api.get<TpayMccListResponse>("/accounts/mcc");
        return response.data;
    }

    /**
     * Fetches the list of the account's points of sale.
     * GET /accounts/pos
     */
    async pos(): Promise<TpayAccountsPosResponse> {
        const response = await this.api.get<TpayAccountsPosResponse>("/accounts/pos");
        return response.data;
    }

    /**
     * Fetches the list of all document types.
     * GET /accounts/document
     */
    async documentTypes(): Promise<TpayDocumentListResponse> {
        const response = await this.api.get<TpayDocumentListResponse>("/accounts/document");
        return response.data;
    }

    /**
     * Fetches a single document type.
     * GET /accounts/document/{documentTypeId}
     */
    async documentType(documentTypeId: string): Promise<TpayDocumentResponse> {
        const response = await this.api.get<TpayDocumentResponse>(`/accounts/document/${encodeURIComponent(documentTypeId)}`);
        return response.data;
    }

    /**
     * Creates a new merchant account.
     * POST /v1/accounts/merchant
     */
    async createMerchant(data: TpayCreateMerchantRequest): Promise<TpayMerchantCreatedResponse> {
        const response = await this.api.post<TpayMerchantCreatedResponse>("/v1/accounts/merchant", data);
        return response.data;
    }
}

/** `client.marketplace` - https://api.tpay.com/#tag/Marketplace */
export class TpayMarketplaceApi {
    constructor(private readonly api: AxiosInstance) {}

    /**
     * Creates a new marketplace transaction.
     * POST /marketplace/v1/transaction
     */
    async createTransaction(data: TpayCreateMarketplaceTransactionRequest): Promise<TpayMarketplaceTransactionCreatedResponse> {
        const response = await this.api.post<TpayMarketplaceTransactionCreatedResponse>("/marketplace/v1/transaction", data);
        return response.data;
    }

    /**
     * Fetches details and status of a marketplace transaction.
     * GET /marketplace/v1/transaction/{id}
     */
    async getTransaction(id: string, params?: { withPaymentAttempts?: boolean }): Promise<TpayMarketplaceTransactionResponse> {
        const response = await this.api.get<TpayMarketplaceTransactionResponse>(
            `/marketplace/v1/transaction/${encodeURIComponent(id)}`,
            { params }
        );
        return response.data;
    }

    /**
     * Provides payment details for a marketplace transaction (applies to selected payment methods).
     * POST /marketplace/v1/transaction/{id}/pay
     */
    async payTransaction(id: string, data: TpayMarketplacePaymentRequest): Promise<TpayTransactionCreatedResponse> {
        const response = await this.api.post<TpayTransactionCreatedResponse>(
            `/marketplace/v1/transaction/${encodeURIComponent(id)}/pay`,
            data
        );
        return response.data;
    }

    /**
     * Creates a new refund for a marketplace transaction. Pass an empty `childTransactions`
     * array to refund the entire transaction.
     * POST /marketplace/v1/transaction/{id}/refund
     */
    async refundTransaction(id: string, data: TpayMarketplaceRefundRequest): Promise<TpayMarketplaceRefundResponse> {
        const response = await this.api.post<TpayMarketplaceRefundResponse>(
            `/marketplace/v1/transaction/${encodeURIComponent(id)}/refund`,
            data
        );
        return response.data;
    }

    /**
     * Cancels a marketplace transaction.
     * POST /marketplace/v1/transaction/{id}/cancel
     */
    async cancelTransaction(id: string): Promise<void> {
        await this.api.post(`/marketplace/v1/transaction/${encodeURIComponent(id)}/cancel`);
    }

    /**
     * Fetches the bank groups available for the given merchants' accounts.
     * GET /marketplace/v1/bank-groups
     */
    async bankGroups(merchantIds?: string[]): Promise<TpayMarketplaceBankGroupsResponse> {
        const response = await this.api.get<TpayMarketplaceBankGroupsResponse>("/marketplace/v1/bank-groups", {
            params: { "merchantId[]": merchantIds },
        });
        return response.data;
    }
}

/** `client.collect` - https://api.tpay.com/#tag/Collect */
export class TpayCollectApi {
    constructor(private readonly api: AxiosInstance) {}

    /**
     * Fetches the list of bank accounts used by the Collect service.
     * GET /collect/bank-accounts
     */
    async listBankAccounts(params?: TpayPaginationParams): Promise<TpayCollectBankAccountListResponse> {
        const response = await this.api.get<TpayCollectBankAccountListResponse>("/collect/bank-accounts", { params });
        return response.data;
    }

    /**
     * Registers a new bank account for the Collect service.
     * POST /collect/bank-accounts
     */
    async createBankAccount(data: TpayCreateBankAccountRequest): Promise<TpayBankAccountCreatedResponse> {
        const response = await this.api.post<TpayBankAccountCreatedResponse>("/collect/bank-accounts", data);
        return response.data;
    }
}

export class TpayClient {
    readonly transactions: TpayTransactionsApi;
    readonly refunds: TpayRefundsApi;
    readonly tokenization: TpayTokenizationApi;
    readonly blik: TpayBlikApi;
    readonly wallet: TpayWalletApi;
    readonly accounts: TpayAccountsApi;
    readonly marketplace: TpayMarketplaceApi;
    readonly collect: TpayCollectApi;

    private readonly api: AxiosInstance;
    private readonly config: TpayConfig;
    private readonly baseUrl: string;

    private cachedToken: TpayLoginResponse | null = null;
    /** Absolute timestamp (ms) at which the cached access token expires. */
    private cachedTokenExpiresAt = 0;

    constructor(config: TpayConfig) {
        this.config = config;
        this.baseUrl = config.sandbox ? "https://openapi.sandbox.tpay.com" : "https://api.tpay.com";

        // Failed responses reject with axios's own `AxiosError` (axios's default behavior),
        // so callers can use `axios.isAxiosError()`.
        this.api = axios.create({ baseURL: this.baseUrl });
        this.api.interceptors.request.use(async (request) => {
            const { access_token } = await this.getValidAccessToken();
            request.headers["Authorization"] = `Bearer ${access_token}`;
            return request;
        });

        this.transactions = new TpayTransactionsApi(this.api);
        this.refunds = new TpayRefundsApi(this.api);
        this.tokenization = new TpayTokenizationApi(this.api);
        this.blik = new TpayBlikApi(this.api);
        this.wallet = new TpayWalletApi(this.api);
        this.accounts = new TpayAccountsApi(this.api);
        this.marketplace = new TpayMarketplaceApi(this.api);
        this.collect = new TpayCollectApi(this.api);
    }

    // ---------------------------------------------------------------------------------------------
    // Authorization
    // ---------------------------------------------------------------------------------------------

    /**
     * Requests a new access token. Prefer `getValidAccessToken()`, which caches the token
     * until it expires.
     * POST /oauth/auth
     */
    async getAccessToken(): Promise<TpayLoginResponse> {
        const response = await axios.post<TpayLoginResponse>(
            `${this.baseUrl}/oauth/auth`,
            new URLSearchParams({
                client_id: this.config.clientId,
                client_secret: this.config.clientSecret,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        return response.data;
    }

    /** Returns the cached access token, requesting a new one when it is missing or expired. */
    async getValidAccessToken(): Promise<TpayLoginResponse> {
        if (this.cachedToken === null || Date.now() >= this.cachedTokenExpiresAt) {
            const token = await this.getAccessToken();
            const lifetime = token.expires_in ?? DEFAULT_ACCESS_TOKEN_LIFETIME_SECONDS;
            this.cachedToken = token;
            this.cachedTokenExpiresAt = Date.now() + (lifetime - ACCESS_TOKEN_EXPIRY_MARGIN_SECONDS) * 1000;
        }
        return this.cachedToken;
    }

    /**
     * Returns information about the active token, including its expiration date.
     * GET /oauth/tokeninfo
     */
    async getTokenInfo(): Promise<TpayTokenInfoResponse> {
        const response = await this.api.get<TpayTokenInfoResponse>("/oauth/tokeninfo");
        return response.data;
    }

    // ---------------------------------------------------------------------------------------------
    // Notifications
    // ---------------------------------------------------------------------------------------------

    /**
     * Verifies a Tpay notification and returns its typed body.
     *
     * Every notification is signed with a detached JWS in the `X-JWS-Signature` header; the signature
     * is checked against the certificate chain published by Tpay, which is fetched once and cached.
     *
     * Throws if the signature or the certificate chain does not check out. Reply with HTTP 200 and
     * `notificationResponse(notification)`, otherwise Tpay keeps resending it.
     */
    async parseNotification(request: Request): Promise<TpayNotification> {
        const signature = request.headers.get("X-JWS-Signature");
        if (!signature) {
            throw new Error("Missing X-JWS-Signature header");
        }
        return this.parseNotificationBody(await request.text(), signature, request.headers.get("Content-Type"));
    }

    /**
     * Same as `parseNotification()`, for frameworks that hand you the raw body and headers
     * instead of a `Request`.
     */
    async parseNotificationBody(body: string, jwsSignature: string, contentType?: string | null): Promise<TpayNotification> {
        await this.verifyJwsSignature(body, jwsSignature);
        return parseNotificationPayload(body, contentType);
    }

    /**
     * Verifies the detached JWS signature of a raw notification body against the certificate
     * pointed to by the `x5u` header, itself verified against the Tpay root CA.
     */
    async verifyJwsSignature(body: string, jwsSignature: string): Promise<void> {
        const [protectedHeader, , signature] = jwsSignature.split(".");
        if (!protectedHeader || !signature) {
            throw new Error("Invalid X-JWS-Signature header");
        }

        const header = JSON.parse(Buffer.from(protectedHeader, "base64url").toString("utf8")) as { x5u?: string };
        const prefix = this.config.sandbox ? SANDBOX_CERTIFICATE_PREFIX : PRODUCTION_CERTIFICATE_PREFIX;
        if (!header.x5u) {
            throw new Error("Missing x5u in the JWS header");
        }
        if (!header.x5u.startsWith(`${prefix}/`)) {
            throw new Error(`Unexpected x5u URL in the JWS header: ${header.x5u}`);
        }

        const rootCaUrl = `${prefix}/x509/tpay-jws-root.pem`;
        const certificate = await getTpayCertificate(header.x5u, rootCaUrl);

        const signingInput = `${protectedHeader}.${Buffer.from(body, "utf8").toString("base64url")}`;
        const valid = crypto.verify(
            "sha256",
            Buffer.from(signingInput, "utf8"),
            { key: certificate.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
            Buffer.from(signature, "base64url")
        );

        if (!valid) {
            // Tpay may have rotated the certificate, so drop the cached one and let the resent
            // notification fetch it again.
            certificateCache.delete(header.x5u);
            throw new Error("Invalid Tpay notification signature");
        }
    }
}

/**
 * Splits a raw notification body into the object Tpay sent, whatever content type it used.
 * Exported for setups that verify the JWS signature elsewhere, e.g. at the edge.
 */
export function parseNotificationPayload(body: string, contentType?: string | null): TpayNotification {
    // Some proxies drop the header, so fall back to sniffing the body.
    if (contentType?.includes("application/json") || body.trimStart().startsWith("{")) {
        return JSON.parse(body) as TpayNotification;
    }

    const params = new URLSearchParams(body);
    const payload: Record<string, unknown> = {};
    for (const [key, value] of params) {
        // BLIK alias notifications are form encoded with PHP-style nesting, e.g. `msg_value[type]`
        const nested = key.match(/^([^[]+)\[([^\]]+)\]$/);
        if (nested) {
            const [, parent, child] = nested as unknown as [string, string, string];
            const target = (payload[parent] ??= {}) as Record<string, unknown>;
            target[child] = value;
        } else {
            payload[key] = value;
        }
    }

    return payload as unknown as TpayNotification;
}

/**
 * The body Tpay expects in the HTTP 200 answer to the given notification. Anything else makes
 * Tpay resend it.
 */
export function notificationResponse(notification: TpayNotification): string {
    return "type" in notification ? '{"result":true}' : "TRUE";
}
