export type TpayAccountDetails = Record<string, unknown>;

export interface TpayAccountRequest {
    /** max length 255. */
    offerCode: string;
    /** max length 255. */
    email: string;
    phone: TpayPhone;
    /** max length 255. */
    taxId: string;
    /** max length 255. */
    regon: string;
    krs: number;
    legalForm: number;
    categoryId: number;
    notifyByEmail: boolean;
    merchantApiConsent: boolean;
    website?: Array<TpayAccountWebsite>;
    address?: Array<TpayAccountAddress>;
    person?: Array<TpayAccountPerson>;
    bankAccount: TpayAccountBankAccount;
}

export interface TpayAccountListResponse {
    list?: Array<TpayAccountDetails>;
    /** max length 255. */
    result: string;
    /** max length 255. */
    requestId: string;
    page: number;
    limit: number;
    total: number;
}

export interface TpayAccountCreatedResponse {
    /** max length 255. */
    result: string;
    /** max length 255. */
    requestId: string;
    /** max length 255. */
    id: string;
    /** max length 255. */
    offerCode: string;
    /** max length 255. */
    email: string;
    /** max length 255. */
    taxId: string;
    /** max length 255. */
    regon: string;
    krs: number;
    legalForm: number;
    categoryId: number;
    notifyByEmail: boolean;
    verificationStatus: number;
    /** max length 255. */
    activationLink: string;
    website?: Array<TpayPosWebsite>;
    address?: Array<TpayCreatedAccountAddress>;
    person?: Array<TpayCreatedAccountPerson>;
    apiCredentials: Array<TpayApiCredential>;
    transactionApiCredentials: TpayTransactionApiCredential;
}

export interface TpayCategoryListResponse {
    list?: Array<TpayCategory>;
    /** max length 255. */
    result: string;
    /** max length 255. */
    requestId: string;
    page: number;
    limit: number;
    total: number;
}

export interface TpayCategoryResponse {
    /** max length 255. */
    result: string;
    /** max length 255. */
    requestId: string;
    id: number;
    /** max length 255. */
    name: string;
}

export interface TpayLegalFormListResponse {
    list?: Array<TpayLegalForm>;
    /** max length 255. */
    result: string;
    /** max length 255. */
    requestId: string;
    page: number;
    limit: number;
    total: number;
}

export interface TpayMccListResponse {
    list?: Array<TpayMcc>;
    /** max length 255. */
    result: string;
    /** max length 255. */
    requestId: string;
    page: number;
    limit: number;
    total: number;
}

export interface TpayAccountsPosResponse {
    list?: Array<TpayPosWebsite>;
    /** max length 255. */
    result: string;
    /** max length 255. */
    requestId: string;
}

export interface TpayLegalFormResponse {
    /** max length 255. */
    result: string;
    /** max length 255. */
    requestId: string;
    id: number;
    /** max length 255. */
    name: string;
}

export interface TpayDocumentListResponse {
    list?: Array<TpayDocument>;
    /** max length 255. */
    result: string;
    /** max length 255. */
    requestId: string;
    page: number;
    limit: number;
    total: number;
}

export interface TpayDocumentResponse {
    /** max length 255. */
    result: string;
    /** max length 255. */
    requestId: string;
    id: number;
    /** max length 255. */
    name: string;
}

export interface TpayCreateMerchantRequest {
    /** max length 255. */
    offerCode: string;
    /** max length 255. */
    email: string;
    /** max length 255. */
    taxId?: string | null;
    /** max length 255. */
    regon?: string | null;
    krs?: string | null;
    legalForm?: number | null;
    categoryId?: number | null;
    address?: Array<TpayMerchantAddress>;
    website?: Array<TpayMerchantWebsite>;
    contactPerson?: Array<TpayMerchantPerson>;
    /** default false. */
    merchantApiConsent?: boolean;
}

export interface TpayMerchantCreatedResponse {
    /** max length 255. */
    result: string;
    /** max length 255. */
    id: string;
    /** max length 255. */
    offerCode: string;
    /** max length 255. */
    email: string;
    /** max length 255. */
    taxId?: string | null;
    /** max length 255. */
    regon?: string | null;
    krs?: number | null;
    legalForm?: number | null;
    categoryId?: number | null;
    verificationStatus: number;
    /** max length 255. */
    activationLink: string;
    website?: Array<TpayCreatedMerchantWebsite>;
    address?: Array<TpayCreatedMerchantAddress>;
    person?: Array<TpayCreatedMerchantPerson>;
    apiCredentials: Array<TpayApiCredential>;
    transactionApiCredentials: TpayTransactionApiCredential;
}

export interface TpayCreateBlikAliasRequest {
    /** Description of the permission asked, visible to the payer. length 1-105. */
    description: string;
    /** Short code of language */
    lang?: "en" | "pl" | "de" | "fr" | "ru" | "it" | "es" | "uk" | null;
    pay: TpayBlikAliasPay;
}

export interface TpayCreateBlikAliasResponse {
    /** Status of the request */
    result: string;
    /** Identifier of your POS which issued the alias request */
    posId: string;
    /** Status of the alias registration */
    status: string;
    /** List of timestamps of alias lifecycle events */
    date: { creation?: string };
    /** Description of the alias, as it was presented to the payer. */
    description: string;
}

export interface TpayBlikAliasDetailsResponse {
    /** Is alias active */
    isActive: boolean;
    aliases: Array<TpayBlikAliasDetails>;
}

export interface TpayDeleteBlikAliasRequest {
    /** Alias type */
    aliasType: "UID" | "PAYID";
}

export interface TpayLoginRequest {
    client_id: string;
    client_secret: string;
}

export interface TpayLoginResponse {
    /** e.g. "1642706725" */
    issued_at: number;
    /** max length 255, default "read". */
    scope?: string;
    /** max length 255, default "Bearer". */
    token_type?: string;
    /** default 7200. */
    expires_in?: number;
    /** max length 255. */
    client_id: string;
    /** max length 255. */
    access_token: string;
}

export interface TpayTokenInfoResponse {
    token: TpayTokenInfoDetails;
    requestId: string;
    /** default "success". */
    result?: string;
}

export interface TpayTokenInfoFailResponse {
    errors: Array<TpayTokenInfoError>;
    requestId: string;
    /** default "failed". */
    result?: string;
}

export interface TpayCreateMarketplaceTransactionRequest {
    /** This parameter affects display language of payment wall and email notifications */
    currency: "PLN";
    /** Transaction description to display on payment wall */
    description: string;
    /** Custom unique value assigned to the transaction ie. orderId. This value will be sent back in webhook notification after successful payment */
    hiddenDescription?: string;
    /** This parameter affects display language of payment wall and email notifications */
    languageCode: "PL" | "EN";
    /** Id of payment channel chosen on merchant side. Null if there was no choice on merchant side. If this value is provided, a payer will see the specific payment wall step of selected payment method. If null, a payer will see the payment wall with choice of all available payment methods */
    preSelectedChannelId?: string | null;
    pos: TpayMarketplacePos;
    billingAddress: TpayBillingAddress;
    childTransactions: Array<TpayMarketplaceChildTransaction>;
    transactionCallbacks: Array<TpayMarketplaceCallback>;
    /** Optional configuration for transaction emails sent to the payer. Each email type can be enabled or disabled individually. By default, all email types are enabled. */
    transactionEmails?: {
        /** Whether the "Transaction Created" email will be sent to the payer. default true. */
        transactionCreated?: boolean;
        /** Deprecated: this option is ignored. This email will always be sent to the payer. default true. */
        transactionPaid?: boolean;
    };
}

export interface TpayMarketplaceTransactionCreatedResponse {
    /** e.g. "01G5EDNEPPNWBJAX8AR5QAMGVA" */
    transactionId: string;
    /** The user-friendly transaction title presented to * the payer */
    title: string;
    /** The URL to payment wall of created transaction. */
    paymentUrl: string;
}

export interface TpayViolationsResponse {
    violations: Record<string, string>;
}

export interface TpayFailedResponse {
    reasons: Array<string>;
}

export interface TpayMarketplaceTransactionResponse {
    /** Transaction title */
    title: string;
    /** This parameter affects display language of payment wall and email notifications */
    currency: "PLN";
    /** Transaction description to display on payment wall */
    description: string;
    /** Custom unique value assigned to the transaction ie. orderId. This value will be sent back in webhook notification after successful payment */
    hiddenDescription: string;
    /** This parameter affects display language of payment wall and email notifications */
    languageCode: "PL" | "EN";
    /** Id of payment channel chosen on merchant side. Null if there was no choice on merchant side. If this value is provided, a payer will see the specific payment wall step of selected payment method. If null, a payer will see the payment wall with choice of all available payment methods */
    preSelectedChannelId: string | null;
    /** e.g. "correct" */
    status: "pending" | "correct" | "refund" | "canceled";
    /** e.g. "2023-01-01 12:00:00.000000" */
    creationDate: string;
    pos: TpayMarketplacePos;
    billingAddress: TpayBillingAddress;
    childTransactions: Array<TpayMarketplaceChildTransactionResponse>;
    transactionCallbacks: Array<TpayMarketplaceCallback>;
    /** Optional configuration for transaction emails sent to the payer. Each email type can be enabled or disabled individually. By default, all email types are enabled. */
    transactionEmails: {
        /** Whether the "Transaction Created" email will be sent to the payer. default true. */
        transactionCreated?: boolean;
        /** Deprecated: this option is ignored. This email will always be sent to the payer. default true. */
        transactionPaid?: boolean;
    };
    payments: TpayPaymentsWithAttempts;
}

export interface TpayBadRequestResponse {
    result: "failed";
    /** e.g. "85136c79cbf9fe36bb9" */
    requestId: string;
    errors?: Array<TpayBadRequestError>;
}

export interface TpayMarketplaceBankGroupsResponse {
    groups: Array<TpayMarketplaceBankGroup>;
}

export interface TpayUnassociatedMerchantResponse {
    reasons: Array<string>;
    unassociatedMerchants: Array<string>;
}

export interface TpayMarketplacePaymentRequest {
    blikPaymentData?: TpayBlikPaymentData;
    cardPaymentData?: TpayCardPaymentData;
    /** Apple Pay Payment Data This is base64 of json containing encrypted payment data received from Apple Pay JS on payment authorized event */
    applePayPaymentData?: string | null;
}

export interface TpayTransactionCreatedResponse {
    /** URL to pay for transaction max length 255. */
    transactionPaymentUrl: string;
    /** Short code of language */
    lang: "en" | "pl" | "de" | "fr" | "ru" | "it" | "es" | "uk";
    payer: TpayTransactionPayer;
    payments: TpayPayments;
    /** success - all actions in the request are successful. actionRequired - after this request you need to perform an action like redirect user to specific URL to finish the operation. pending - all actions in the request are successful, but you need to wait for confirmation (action is asynchronous). failed - request failed, validation went wrong, or action finished with declined status, look after errors section in response to see more information */
    result: "success" | "actionRequired" | "pending" | "failed";
    /** e.g. "85136c79cbf9fe36bb9" */
    requestId: string;
    /** e.g. "ta_6UvbBjehvHXA7vfD or 01K1Z6T40ZWKY1XZG9VD5AZ9Q4" */
    transactionId: string;
    /** e.g. "TR-BRA-KGZK0X" */
    title: string;
    /** e.g. "ps_6UvbBjehvHXA7vfD" */
    posId: string;
    /** pending - transaction is waiting for being processed paid - transaction is paid correct - merchant has accepted payment refund - transaction has been fully refunded canceled - transaction has been marked as canceled */
    status: "paid" | "correct" | "pending" | "refund" | "canceled";
    /** e.g. 12.34 */
    amount: number;
    /** Currency code in ISO-4217 */
    currency: string;
    /** Description of the transaction. */
    description: string;
    /** Parameter to identify the transaction on the merchant side. */
    hiddenDescription: string;
    date: TpayTransactionDates;
}

export interface TpayMarketplaceRefundRequest {
    /** Empty array to refund entire transaction payment or array of child transactions to refund */
    childTransactions: Array<TpayMarketplaceRefundChildTransaction>;
}

export interface TpayMarketplaceRefundResponse {
    /** e.g. "01G5EDNEPPNWBJAX8AR5QAMGVA" */
    transactionId: string;
    /** e.g. "20" */
    amount: number;
}

export interface TpayTransactionListResponse {
    transactions?: Array<TpayTransaction>;
    /** max length 255. */
    result: string;
    /** max length 255. */
    requestId: string;
    page: number;
    limit: number;
    total: number;
}

export interface TpayCreateTransactionRequest {
    /** min 0 (exclusive). */
    amount: number;
    /** ISO 4217 currency code */
    currency: "PLN";
    /** Description of the transaction. length 1-128. */
    description: string;
    /** Parameter to identify the transaction on the merchant side. max length 255. */
    hiddenDescription?: string | null;
    /** Short code of language */
    lang?: "en" | "pl" | "de" | "fr" | "ru" | "it" | "es" | "uk" | null;
    payer: TpayPayer;
    pay?: TpayPay;
    callbacks?: TpayCallbacks;
    /** Payee data, this field is available only when your company is a Payment Provider */
    payee?: TpayPayee | null;
}

export interface TpayTransactionQrRequest {
    /** Size of resulting QR code default "M". */
    size?: "S" | "M" | "L" | "XL";
    /** Desired type of resulting image default "image/png". */
    outputType?: "image/png" | "image/jpeg" | "image/svg+xml";
    /** Base64 encoded image of logo to be embedded into QR code. */
    logo?: string;
    /** Type of logo image to be embedded into QR code */
    logoType?: "image/png" | "image/jpeg" | "image/svg+xml" | null;
    /** Optional link type used in the QR redirect URL. Set to 'gtitle' when this transaction was created for a payment channels group (pay.groupId) rather than a single channel — the caller is responsible for this being accurate, it is not verified against the transaction. Any other value, including 'title' (default), has no effect. */
    linkType?: "gtitle" | "title" | null;
}

export interface TpayPay {
    /** Bank group ID */
    groupId?: number | null;
    /** Payment method ID */
    channelId?: number | null;
    /** e.g. "pay_by_link" */
    method?: "pay_by_link" | "transfer" | "sale" | null;
    blikPaymentData?: TpayBlikPaymentData;
    cardPaymentData?: TpayCardPaymentData;
    tokenPaymentData?: TpayTokenPaymentData;
    /** Credentials On File This option indicates type of card token payment. List of available options: unscheduled - does not occur on a scheduled or regularly occurring transaction date, card charges initiated by merchant cardholder_initiated - indicates that card charge is being processed with the intention of retaining the cardholder’s data recurring - card charges initiated by merchant at regular fixed intervals default "unscheduled". */
    cof?: "unscheduled" | "cardholder_initiated" | "recurring" | null;
    /** Apple Pay Payment Data This is base64 of json containing encrypted payment data received from Apple Pay JS on payment authorized event */
    applePayPaymentData?: string | null;
    clickToPayPaymentData?: TpayClickToPayPaymentData;
}

export interface TpayTransaction {
    lock: TpayTransactionLock;
    payments: TpayPaymentsWithAttempts;
    /** success - all actions in the request are successful. actionRequired - after this request you need to perform an action like redirect user to specific URL to finish the operation. pending - all actions in the request are successful, but you need to wait for confirmation (action is asynchronous). failed - request failed, validation went wrong, or action finished with declined status, look after errors section in response to see more information */
    result: "success" | "actionRequired" | "pending" | "failed";
    /** e.g. "85136c79cbf9fe36bb9" */
    requestId: string;
    /** e.g. "ta_6UvbBjehvHXA7vfD or 01K1Z6T40ZWKY1XZG9VD5AZ9Q4" */
    transactionId: string;
    /** e.g. "TR-BRA-KGZK0X" */
    title: string;
    /** e.g. "ps_6UvbBjehvHXA7vfD" */
    posId: string;
    /** pending - transaction is waiting for being processed paid - transaction is paid correct - merchant has accepted payment refund - transaction has been fully refunded canceled - transaction has been marked as canceled */
    status: "paid" | "correct" | "pending" | "refund" | "canceled";
    /** e.g. 12.34 */
    amount: number;
    /** Currency code in ISO-4217 */
    currency: string;
    /** Description of the transaction. */
    description: string;
    /** Parameter to identify the transaction on the merchant side. */
    hiddenDescription: string;
    date: TpayTransactionDates;
}

export interface TpayTransactionRefundsResponse {
    lock: TpayTransactionLock;
    payments: TpayPaymentsWithAttempts;
    /** Refund data. */
    refundsList: Array<TpayRefundTransaction>;
    /** Refund no account data. */
    refundsNoAccountList: Array<TpayRefundNoAccount>;
    /** Refund cards data.. */
    refundsCardsList: Array<TpayRefundCard>;
    /** Page number. min 1, default 1. */
    page?: number;
    /** Limit of records. min 1, max 100, default 35. */
    limit?: number;
    /** Quantity of records. min 0. */
    total: number;
    /** success - all actions in the request are successful. actionRequired - after this request you need to perform an action like redirect user to specific URL to finish the operation. pending - all actions in the request are successful, but you need to wait for confirmation (action is asynchronous). failed - request failed, validation went wrong, or action finished with declined status, look after errors section in response to see more information */
    result: "success" | "actionRequired" | "pending" | "failed";
    /** e.g. "85136c79cbf9fe36bb9" */
    requestId: string;
    /** e.g. "ta_6UvbBjehvHXA7vfD or 01K1Z6T40ZWKY1XZG9VD5AZ9Q4" */
    transactionId: string;
    /** e.g. "TR-BRA-KGZK0X" */
    title: string;
    /** e.g. "ps_6UvbBjehvHXA7vfD" */
    posId: string;
    /** pending - transaction is waiting for being processed paid - transaction is paid correct - merchant has accepted payment refund - transaction has been fully refunded canceled - transaction has been marked as canceled */
    status: "paid" | "correct" | "pending" | "refund" | "canceled";
    /** e.g. 12.34 */
    amount: number;
    /** Currency code in ISO-4217 */
    currency: string;
    /** Description of the transaction. */
    description: string;
    /** Parameter to identify the transaction on the merchant side. */
    hiddenDescription: string;
    date: TpayTransactionDates;
}

export interface TpayCreateTransactionRefundRequest {
    /** Amount. multipleOf 0.01 min 0 (exclusive). */
    amount?: number | null;
}

export interface TpayBankGroupsResponse {
    /** success - all actions in the request are successful. actionRequired - after this request you need to perform an action like redirect user to specific URL to finish the operation. pending - all actions in the request are successful, but you need to wait for confirmation (action is asynchronous). failed - request failed, validation went wrong, or action finished with declined status, look after errors section in response to see more information */
    result: "success" | "actionRequired" | "pending" | "failed";
    /** e.g. "85136c79cbf9fe36bb9" */
    requestId: string;
    /** Bank group. */
    groups: Array<TpayBankGroup>;
}

export interface TpayChannelsResponse {
    /** success - all actions in the request are successful. failed - more details in errors section */
    result: "success" | "failed";
    /** e.g. "85136c79cbf9fe36bb9" */
    requestId: string;
    /** e.g. "pl" */
    language: string;
    /** e.g. "PLN" */
    currency: string;
    /** Channels data. */
    channels: Array<TpayChannel>;
}

export interface TpayServerErrorResponse {
    /** max length 255, default "failed". */
    result?: string;
    /** max length 255, default "". */
    requestId?: string;
    errors?: Array<TpayServerError>;
}

export interface TpayRefundListResponse {
    /** List of available transaction statuses * success - all actions in the request are successful * actionRequired - after this request you need to perform an action like redirect user to specific URL to finish the operation * pending - all actions in the request are successful, but you need to wait for confirmation (action is asynchronous) * failed - request failed, validation went wrong, or action finished with declined status, look after errors section in response to see more information */
    result: "success" | "actionRequired" | "pending" | "failed";
    /** e.g. "85136c79cbf9fe36bb9" */
    requestId: string;
    transactions: TpayRefundTransactionList;
    /** Page number. */
    page: number;
    /** Limit of records. */
    limit: number;
    /** Quantity of records. */
    total: number;
}

export interface TpayRefundBadRequestResponse {
    /** List of available transaction statuses * success - all actions in the request are successful * actionRequired - after this request you need to perform an action like redirect * user to specific URL to finish the operation * pending - all actions in the request are successful, * but you need to wait for confirmation (action is asynchronous) * failed - request failed, validation went wrong, or action finished with declined status, look after errors section in response to see more information */
    result: "success" | "actionRequired" | "pending" | "failed";
    /** e.g. "85136c79cbf9fe36bb9" */
    requestId: string;
    errors: Array<TpayRefundBadRequestError>;
}

export interface TpayCreateRefundRequest {
    /** Amount min 0 (exclusive). */
    amount: number;
    /** Currency code of refund min 0 (exclusive). */
    currencyCode: number;
    /** Length should be one of 12-19 for EISOP. max length 255. */
    tokenValue: string;
    /** Card expiry date in YYMM format. Required with EISOP token. max length 255. */
    cardExpiryDate?: string | null;
    /** Custom identificator for settlement. This value must be alphanumeric. max length 255. */
    rocText?: string | null;
}

export interface TpayRefundCreatedResponse {
    /** List of available transaction statuses success - all actions in the request are successful actionRequired - after this request you need to perform an action like redirect user to specific URL to finish the operation pending - all actions in the request are successful, but you need to wait for confirmation (action is asynchronous) failed - request failed, validation went wrong, or action finished with declined status, look after errors section in response to see more information max length 255. */
    result: "success" | "actionRequired" | "pending" | "failed";
    /** Request id max length 255. */
    requestId: string;
    refundContent: TpayRefundContent;
}

export interface TpayRefundResponse {
    /** List of available transaction statuses * success - all actions in the request are successful * actionRequired - after this request you need to perform an action like redirect user to specific URL to finish the operation * pending - all actions in the request are successful, but you need to wait for confirmation (action is asynchronous) * failed - request failed, validation went wrong, or action finished with declined status, look after errors section in response to see more information */
    result: "success" | "actionRequired" | "pending" | "failed";
    /** e.g. "85136c79cbf9fe36bb9" */
    requestId: string;
    /** ID of a Refund. */
    refundId: string;
    /** Available refund status for 'transactional' context * new - fresh refund * pending - awaiting refund to process * to_complete - refund is awaiting for payer data completion (missing bank account) * cancel - aborted refund, will not be porcessed * hold - refund temporary aborted, will be processed after verification process * processed - refund processed, but not done (awaiting for send to payer) * done - refund done, money has ben sent Available refund status for 'card' context * new - fresh refund * declined - refund declined by acquirer * authorized - refund done */
    status: "new" | "pending" | "to_complete" | "cancel" | "hold" | "processed" | "done" | "declined" | "authorized";
    /** Amount */
    amount: number;
    /** Currency code in ISO-4217. */
    currency: "PLN" | "GPB" | "USD" | "EUR" | "CZK" | "NOK" | "DKK" | "SEK" | "CHF";
    date: TpayRefundDates;
}

export interface TpayApplePayInitRequest {
    /** Correct domain name provided during boarding. */
    domainName: string;
    /** Name displayed when paying. If it is not given, the name is taken from the data provided during boarding. length 1-64. */
    displayName?: string | null;
    /** Correct domain name provided during boarding. The URL that is required to obtain an Apple Pay session. More information can be found: https://developer.apple.com/documentation/apple_pay_on_the_web/applepayvalidatemerchantevent/1778026-validationurl */
    validationUrl: string;
}

export interface TpayApplePayInitResponse {
    /** List of available transaction statuses: * success - all actions in the request are successful * actionRequired - after this request you need to perform an action like redirect user to specific URL to finish the operation * pending - all actions in the request are successful, but you need to wait for confirmation (action is asynchronous) * failed - request failed, validation went wrong, or action finished with declined status, look after errors section in response to see more information */
    result: "success" | "actionRequired" | "pending" | "failed";
    /** e.g. "85136c79cbf9fe36bb9" */
    requestId: string;
    /** e.g. "\n        ewogICAiZXBvY2hUaW1lc3RhbXAiOjE2NDc1MDU4ODkxODAsCiAgICJleHBpcmVzQXQiOjE2NDc1MDk0ODkxODAsCiAgICJtZXJjaGFudFNlc3N\n        (...)\n        2ZjcwZDAxMDcwMmEwODAzMDgwMDIwMTAxMzEwZjMwMGQwNjA5NjA4NjQ4MDE2NTAzMDQwMjAxMDUwMDMwODAwNjA5MmE4NjQ4ODZmNzBkMDEwNz\n        AxMDAwMGEwODAzMDgyMDNlNDMwODIwMzhiYTAwMzAyMDEwMjAyMDg1OWQ4YTFiY2FhZjRlM2NkMzAwYTA2MDgyYTg2NDhjZTNkMDQwMzAyMzA3Y\n        " */
    session: string;
}

export interface TpayCreateCardTokenRequest {
    payer?: TpayTokenizationPayer | null;
    /** Url used to notification about ending tokenization process */
    callbackUrl: string;
    /** Additional data. */
    redirectUrl?: TpayTokenizationRedirectUrl | null;
    /** Encrypted card data. */
    card?: string | null;
}

export interface TpayCardTokenCreatedResponse {
    /** List of available transaction statuses success - all actions in the request are successful actionRequired - after this request you need to perform an action like redirect user to specific URL to finish the operation pending - all actions in the request are successful, but you need to wait for confirmation (action is asynchronous) failed - request failed, validation went wrong, or action finished with declined status, look after errors section in response to see more information max length 255. */
    result: "success" | "actionRequired" | "pending" | "failed";
    /** Request id max length 255. */
    requestId: string;
    /** Tokenization identifier max length 255. */
    id: string;
    /** Url to tokenization page max length 255. */
    url: string;
}

export interface TpayCardTokenResponse {
    /** The expiration date of the token */
    expirationDate: string;
    /** The status of the token */
    tokenStatus: "ACTIVE" | "DELETED" | "RESUME" | "SUSPENDED";
    /** A masked card number containing the Bank Identification Number (BIN) and the last four digits of the card max length 255. */
    cardTail: string;
    content: TpayCardToken;
}

export interface TpayCollectBankAccountListResponse {
    /** e.g. "success" */
    result: string;
    /** e.g. "85136c79cbf9fe36bb9" */
    requestId: string;
    bankAccounts: Array<TpayCollectBankAccount>;
    /** Page number. */
    page: number;
    /** Limit of records. */
    limit: number;
    /** Quantity of records. */
    total: number;
}

export interface TpayCreateBankAccountRequest {
    /** Polish IBAN length 28-28. */
    accountNumber: string;
    /** max length 1000. */
    ownerName: string;
    /** max length 1000. */
    additionalInformation: string;
}

export interface TpayBankAccountCreatedResponse {
    /** e.g. "success" */
    result: string;
    /** Request id max length 255. */
    requestId: string;
    /** The value is represented by ULID encoded to base32 format */
    id: string;
    /** Polish IBAN */
    accountNumber: string;
    /** e.g. "Jan Kowalski" */
    ownerName: string;
    /** e.g. "ul. Libelta 8/2, 01-042 Warszawa" */
    additionalInformation: string;
    /** e.g. "active" */
    status: "active" | "deactivated";
    /** e.g. "2025-07-31 11:04:29" */
    createdAt: string;
}

export interface TpayPhone {
    /** Phone number max length 15. */
    phoneNumber: string;
    /** Country code in ISO 3166-1 alfa-2 length 2-2. */
    phoneCountry: string;
}

export interface TpayAccountWebsite {
    /** max length 255. */
    description: string;
    /** max length 255. */
    url: string;
    /** max length 255. */
    name: string;
    /** max length 255. */
    friendlyName: string;
}

export interface TpayAccountAddress {
    /** max length 255. */
    name: string;
    /** max length 255. */
    friendlyName: string;
    /** max length 255. */
    street: string;
    /** max length 255. */
    houseNumber: string;
    /** max length 255. */
    roomNumber: string;
    /** max length 255. */
    postalCode: string;
    /** max length 255. */
    city: string;
    /** max length 255. */
    country: string;
    /** max length 255. */
    phone: string;
    isMain: boolean;
    isCorrespondence: boolean;
    isInvoice: boolean;
}

export interface TpayAccountPerson {
    /** max length 255. */
    name: string;
    /** max length 255. */
    surname: string;
    /** max length 255. */
    nationality: string;
    sharesPct: number;
    /** max length 255. */
    pesel: string;
    isBeneficiary: boolean;
    isRepresentative: boolean;
    isContactPerson: boolean;
    isAuthorizedPerson: boolean;
    pepStatement: number;
    /** e.g. "1980-01-01 00:00:00" */
    dateOfBirth: string | null;
    /** max length 255. */
    countryOfBirth: string;
    typeOfDocument: number;
    /** max length 255. */
    serialNumber: string;
    /** e.g. "2022-01-01 00:00:00" */
    expiryDate: string | null;
    /** max length 255. */
    issuingAuthority: string;
    contact: TpayPersonContact;
}

export interface TpayAccountBankAccount {
    /** length 26-26. */
    accountNo: string;
    /** max length 64. */
    bankName: string;
    /** max length 128. */
    ownerName: string;
    /** max length 128. */
    ownerAddress: string;
    /** Currency code in ISO-4217 default "PLN". */
    currency?: "PLN" | "GPB" | "USD" | "EUR" | "CZK" | "NOK" | "DKK" | "SEK" | "CHF";
    /** Country code in ISO 3166-1 alfa-2 length 2-2. */
    countryCode: string;
    /** 1 - polish (we only accept PLN currency), 2 - SEPA (we only accept EUR currency), 3 - foreign (we accept PLN, EUR, USD, GBP currencies) default 1. */
    accountType?: 1 | 2 | 3;
}

export interface TpayPosWebsite {
    /** max length 255. */
    posId: string;
    /** max length 255. */
    accountId: string;
    date: TpayPosDates;
    settings: TpayPosSettings;
    /** max length 255. */
    description: string;
    /** max length 255. */
    url: string;
    /** max length 255. */
    name: string;
    /** max length 255. */
    friendlyName: string;
}

export interface TpayCreatedAccountAddress {
    /** max length 255. */
    addressId: string;
    /** max length 255. */
    name: string;
    /** max length 255. */
    friendlyName: string;
    /** max length 255. */
    street: string;
    /** max length 255. */
    houseNumber: string;
    /** max length 255. */
    roomNumber: string;
    /** max length 255. */
    postalCode: string;
    /** max length 255. */
    city: string;
    /** max length 255. */
    country: string;
    /** max length 255. */
    phone: string;
    isMain: boolean;
    isCorrespondence: boolean;
    isInvoice: boolean;
}

export interface TpayCreatedAccountPerson {
    /** max length 255. */
    personId: string;
    /** max length 255. */
    name: string;
    /** max length 255. */
    surname: string;
    /** max length 255. */
    nationality: string;
    sharesPct: number;
    /** max length 255. */
    pesel: string;
    isBeneficiary: boolean;
    isRepresentative: boolean;
    isContactPerson: boolean;
    isAuthorizedPerson: boolean;
    pepStatement: number;
    /** e.g. "1980-01-01 00:00:00" */
    dateOfBirth: string | null;
    /** max length 255. */
    countryOfBirth: string;
    typeOfDocument: number;
    /** max length 255. */
    serialNumber: string;
    /** e.g. "2022-01-01 00:00:00" */
    expiryDate: string | null;
    /** max length 255. */
    issuingAuthority: string;
    contact: TpayPersonContact;
}

export interface TpayApiCredential {
    /** max length 255. */
    clientId: string;
    /** max length 255. */
    clientSecret: string;
}

export interface TpayTransactionApiCredential {
    /** max length 255. */
    merchantId: string;
    /** max length 255. */
    apiKey: string;
    /** max length 255. */
    apiPassword: string;
}

export interface TpayCategory {
    id: number;
    /** max length 255. */
    name: string;
}

export interface TpayLegalForm {
    id: number;
    /** max length 255. */
    name: string;
}

export interface TpayMcc {
    id: number;
    /** max length 255. */
    name: string;
    /** max length 6. */
    code: string;
}

export interface TpayDocument {
    id: number;
    /** max length 255. */
    name: string;
}

export interface TpayMerchantAddress {
    /** max length 255. */
    name: string;
    /** max length 255. */
    street: string;
    /** max length 255. */
    houseNumber: string;
    /** max length 255. */
    flatNumber: string;
    /** max length 255. */
    postalCode: string;
    /** max length 255. */
    city: string;
    /** max length 255. */
    country: string;
    /** max length 255. */
    phone: string;
    isMain: boolean;
    isCorrespondence: boolean;
    isInvoice: boolean;
}

export interface TpayMerchantWebsite {
    /** max length 255. */
    url: string;
    /** max length 255. */
    name: string;
}

export interface TpayMerchantPerson {
    /** max length 255. */
    name: string;
    /** max length 255. */
    surname: string;
    /** max length 255. */
    phone: string;
    /** max length 255. */
    email: string;
}

export interface TpayCreatedMerchantWebsite {
    /** max length 255. */
    posId: string;
    /** max length 255. */
    accountId: string;
    /** max length 255. */
    friendlyName: string;
    /** max length 255. */
    description: string;
    /** max length 255. */
    url: string;
    /** max length 255. */
    name: string;
}

export interface TpayCreatedMerchantAddress {
    /** max length 255. */
    addressId: string;
    /** max length 255. */
    name: string;
    /** max length 255. */
    street: string;
    /** max length 255. */
    houseNumber: string;
    /** max length 255. */
    flatNumber: string;
    /** max length 255. */
    postalCode: string;
    /** max length 255. */
    city: string;
    /** max length 255. */
    country: string;
    /** max length 255. */
    phone: string;
    isMain: boolean;
    isCorrespondence: boolean;
    isInvoice: boolean;
}

export interface TpayCreatedMerchantPerson {
    /** max length 255. */
    personId: string;
    /** max length 255. */
    name: string;
    /** max length 255. */
    surname: string;
    isBeneficiary: boolean;
    isRepresentative: boolean;
    isContactPerson: boolean;
    isAuthorizedPerson: boolean;
    contact: Array<TpayPersonContact>;
}

export interface TpayBlikAliasPay {
    blikPaymentData?: TpayBlikAliasPaymentData;
}

export interface TpayBlikAliasDetails {
    /** Alias type */
    aliasType: string;
    /** Alias value */
    aliasValue: string;
    /** Is alias active */
    isActive: boolean;
    /** Alias expiration date ISO 8601 date-time. */
    expiresAt: string;
    events: Array<TpayBlikAliasEvent>;
    /** Alias label */
    label: string;
}

export interface TpayTokenInfoDetails {
    access_token: string;
    client_id: string;
    /** e.g. "1684763050" */
    expires: number;
    scope: string;
}

export interface TpayTokenInfoError {
    errorCode: string;
    errorMessage: string;
    fieldName: string;
    devMessage: string;
    /** default "https://openapi.tpay.com". */
    docUrl?: string;
}

export interface TpayMarketplacePos {
    /** Point Of Sale - this must be an active, verified POS added to requester account. The value is represented by ULID encoded to base32 format. To check your POS ID call the /accounts/pos API endpoint */
    id: string;
}

export interface TpayBillingAddress {
    /** Payer email */
    email: string;
    /** Payer full name length 1-96. */
    name: string;
    /** Payer phone number */
    phone?: string | null;
    /** Payer street */
    street?: string | null;
    /** Payer postal code */
    postalCode?: string | null;
    /** Payer city */
    city?: string | null;
    /** Payer country in ISO 3166 format */
    country?: string | null;
    /** Payer address house no */
    houseNo?: string | null;
    /** Payer address flat no */
    flatNo?: string | null;
}

export interface TpayMarketplaceChildTransaction {
    /** Value in pennies ie. 123.45PLN should be passed as int: 12345. The sum of child transactions equals the total transaction value. Minimum one child transaction is required. min 0 (exclusive). */
    amount: number;
    description: string;
    /** An optional custom value from merchant system. */
    hiddenDescription?: string | null;
    merchant: TpayMarketplaceMerchant;
    products: Array<TpayProduct>;
}

export interface TpayMarketplaceCallback {
    /** 1: Payer redirect url in success case, 2: Payer redirect url in error case, 3: POST notification url after successful payment, 4: Merchant notification email */
    type: 1 | 2 | 3 | 4;
    /** e.g. "https://domain.com/transactionCallback" */
    value: string;
}

export interface TpayMarketplaceChildTransactionResponse {
    /** e.g. "01JABM26M0EX41CKJ4A6MCNZ59" */
    id: string;
    /** Value in pennies ie. 123.45PLN should be passed as int: 12345. The sum of child transactions equals the total transaction value. Minimum one child transaction is required. */
    amount: number;
    description: string;
    hiddenDescription?: string | null;
    merchant: TpayMarketplaceMerchant;
    refunds: Array<TpayMarketplaceChildRefund>;
}

export interface TpayPaymentsWithAttempts {
    attempts?: Array<TpayPaymentAttempt>;
}

export interface TpayBadRequestError {
    /** e.g. "invalid_pos_id" */
    errorCode: string;
    /** e.g. "POS ID does not match a required format (e.g. ps_6UvbBjehvHXA7vfD)" */
    errorMessage: string;
    /** e.g. "posId" */
    fieldName: string;
    /** e.g. "Provided POS id does not satisfy regexp /ps_[a-zA-Z0-9]{16}/" */
    devMessage: string;
    /** e.g. "https://support.tpay.com/en/case-study/implementing-payment-gateway" */
    docUrl: string;
}

export interface TpayMarketplaceBankGroup {
    /** e.g. "12" */
    id: string;
    /** e.g. "Bank 1" */
    name: string;
    /** e.g. "https://example.org/img/1.jpg" */
    img: string;
    /** e.g. "10" */
    mainChannel: string;
    availablePaymentChannels: Array<string>;
}

export interface TpayBlikPaymentData {
    /** 6 digit code generated in customer bank mobile app (required if customer does not have registered alias or when customer does not want to pay by registered device). length 6-6. */
    blikToken?: string | null;
    aliases?: TpayBlikAlias | null;
    /** Transaction type. List of available options: 0 - WEB mode 1 - POS mode dedicated for payment terminals 2 - Autopayment with only an alias, you need to register one first, see aliases field. default 0. */
    type?: 0 | 1 | 2 | null;
    /** Request transaction to be refused if bank doesn't support recurring payments */
    refuseNoPayId?: boolean | null;
}

export interface TpayCardPaymentData {
    /** Encrypted card data */
    card?: string | null;
    /** Card token max length 64. */
    token?: string | null;
    /** Defines if card data must be saved for future use. */
    save?: number | null;
    /** Custom identificator for settlement. This value must be alphanumeric. max length 12. */
    rocText?: string | null;
}

export interface TpayTransactionPayer {
    /** Payer Id read-only. */
    payerId: string;
    /** Email */
    email: string;
    /** Full name and surname length 3-255. */
    name: string;
    /** Phone number min length 3. */
    phone: string;
    /** Payer billing address length 3-255. */
    address: string;
    /** Postal code or zip code length 3-10. */
    postalCode: string;
    /** Full city name length 3-64. */
    city: string;
    /** Country code in ISO 3166-1 alfa-2 length 2-2. */
    country: string;
    /** Payer tax identification number length 3-255. */
    taxId?: string | null;
}

export interface TpayPayments {
    /** e.g. "correct" */
    status: "correct" | "pending" | "declined";
    /** e.g. "pay_by_link" */
    method: "pay_by_link" | "transfer" | "sale";
    /** e.g. 12.34 */
    amountPaid: number;
    date: TpayPaymentDates;
    errors: TpayPaymentError;
}

export interface TpayTransactionDates {
    /** Transaction creation time */
    creation: string;
    /** Time of booking transaction */
    realization?: string | null;
}

export interface TpayMarketplaceRefundChildTransaction {
    /** Child transaction id (either this or merchant id must be provided) */
    id: string;
    /** Child transaction Merchant Id (either this or child transaction id must be provided) */
    merchantId: string;
    /** Value in pennies min 0 (exclusive). */
    amount: number;
    products: Array<TpayProduct>;
}

export interface TpayPayer {
    /** Email */
    email: string;
    /** Full name and surname length 3-255. */
    name: string;
    /** Phone number min length 3. */
    phone?: string | null;
    /** Payer billing address length 3-255. */
    address?: string | null;
    /** Postal code or zip code length 3-10. */
    code?: string | null;
    /** Full city name length 3-64. */
    city?: string | null;
    /** Country code in ISO 3166-1 alfa-2 length 2-2. */
    country?: string | null;
    /** Payer tax identification number length 3-255. */
    taxId?: string | null;
    /** Payer IP length 7-45. */
    ip?: string | null;
    /** Payer User Agent length 1-255. */
    userAgent?: string | null;
}

export interface TpayCallbacks {
    payerUrls?: TpayPayerUrls;
    notification?: TpayNotificationCallback;
}

export interface TpayPayee {
    /** max length 255. */
    name: string;
    /** max length 255. */
    url: string;
    /** Merchant Category Code, 4 digits, may have a leading zero. Required when address is provided. */
    mcc?: string | null;
    /** Payee address. When any address field is provided, all fields except flatNumber are required. */
    address?: TpayPayeeAddress | null;
}

export interface TpayTokenPaymentData {
    /** Length should be one of 12-19 for EISOP. length 12-19. */
    tokenValue: string;
    /** Card expiry date in YYMM format */
    cardExpiryDate: string;
    /** Id of the initial transaction. This value corresponds to Elavon's Card Scheme Data max length 22. */
    initialTransactionId: string;
    /** Brand of the tokenized card */
    cardBrand: string;
    /** Custom identificator for settlement. This value must be alphanumeric. max length 12. */
    rocText?: string | null;
}

export interface TpayClickToPayPaymentData {
    /** Encrypted payment data */
    paymentData?: string | null;
    /** Network */
    network?: "visa" | "mastercard" | null;
}

export interface TpayTransactionLock {
    /** Type of transaction lock */
    type?: "Balance" | "Chargeback" | "Transaction" | null;
    /** Lock status */
    status?: "Active" | "Removed" | "Executed" | null;
    /** Amount */
    amount?: number | null;
    /** Amount */
    amountCollected?: number | null;
}

export interface TpayRefundTransaction {
    /** e.g. "rf_6UvbBjehvHXA7vfD" */
    refundId: string;
    /** Available refund status for 'transactional' context * new - fresh refund * pending - awaiting refund to process * to_complete - refund is awaiting for payer data completion (missing bank account) * cancel - aborted refund, will not be porcessed * hold - refund temporary aborted, will be processed after verification process * processed - refund processed, but not done (awaiting for send to payer) * done - refund done, money has ben sent Available refund status for 'card' context * new - fresh refund * declined - refund declined by acquirer * authorized - refund done */
    status: string;
    /** Amount */
    amount: number;
    /** Currency code in ISO-4217. */
    currency: "PLN" | "GPB" | "USD" | "EUR" | "CZK" | "NOK" | "DKK" | "SEK" | "CHF";
    date: TpayRefundDates;
}

export interface TpayRefundNoAccount {
    /** e.g. "rf_6UvbBjehvHXA7vfD" */
    refundId: string;
    /** Amount */
    amount: number;
    /** Currency code in ISO-4217. */
    currency: "PLN" | "GPB" | "USD" | "EUR" | "CZK" | "NOK" | "DKK" | "SEK" | "CHF";
    date: TpayRefundNoAccountDates;
}

export interface TpayRefundCard {
    /** e.g. "rf_6UvbBjehvHXA7vfD" */
    refundId: string;
    /** Amount */
    amount: number;
    /** Currency code in ISO-4217. */
    currency: "PLN" | "GPB" | "USD" | "EUR" | "CZK" | "NOK" | "DKK" | "SEK" | "CHF";
    date: TpayRefundCardDates;
}

export interface TpayBankGroup {
    /** Bank group ID */
    id: string;
    /** Bank group name */
    name: string;
    /** Image url for given group */
    img: string;
    /** List of channels IDs for future use */
    availablePaymentChannels: string;
    /** Main channel ID for future use */
    mainChannel: string;
}

export interface TpayChannel {
    /** e.g. "1" */
    id: string;
    /** e.g. "Channel name" */
    name: string;
    /** e.g. "Channel full name" */
    fullName: string;
    image: TpayImage;
    /** e.g. true */
    available: boolean;
    /** e.g. true */
    onlinePayment: boolean;
    /** e.g. true */
    instantRedirection: boolean;
    /** Groups data. */
    groups: Array<TpayChannelGroup>;
    /** Constraints data. */
    constraints: Array<TpayChannelConstraint>;
}

export interface TpayServerError {
    /** max length 255, default "internal_server_error". */
    errorCode?: string;
    /** max length 255, default "Internal Server Error". */
    errorMessage?: string;
    /** max length 255, default "". */
    fieldName?: string;
    /** max length 255, default "". */
    devMessage?: string;
    /** max length 255, default "". */
    docUrl?: string;
}

export interface TpayRefundTransactionList {
    list: Array<TpayRefundTransaction>;
}

export interface TpayRefundBadRequestError {
    /** Error code represents specific error id. */
    errorCode: string;
    /** End user error message. */
    errorMessage: string;
    /** Information about invalid field. */
    fieldName: string;
    /** Information on how developers can solve the issue. */
    devMessage: string;
    /** URL to the information about the error code reported. */
    docUrl: string;
}

export interface TpayRefundContent {
    /** Status of refund. */
    status: string;
    /** ID of a Refund. */
    refundId: string;
    /** Currency code of refund */
    currencyCode: number;
    /** Amount */
    amount: number;
    extra: TpayRefundContentExtra;
}

export interface TpayRefundDates {
    /** Date when refund where scheduled. */
    schedule: string;
    /** Date when refund where complete. */
    processed?: string | null;
}

export interface TpayTokenizationPayer {
    /** Card's owner full name */
    name: string;
    /** Card's owner e-mail */
    email: string;
}

export interface TpayTokenizationRedirectUrl {
    /** Url used to redirect payer after successful tokenization process */
    success: string;
    /** Url used to redirect payer after unsuccessful tokenization process */
    error: string;
}

export interface TpayCardToken {
    /** URL of the card image */
    imageUrl: string;
}

export interface TpayCollectBankAccount {
    /** The value is represented by ULID encoded to base32 format */
    id: string;
    /** Polish IBAN */
    accountNumber: string;
    /** e.g. "Jan Kowalski" */
    ownerName: string;
    /** e.g. "ul. Libelta 8/2, 01-042 Warszawa" */
    additionalInformation: string;
    /** e.g. "active" */
    status: "active" | "deactivated";
    /** e.g. "2025-07-31 11:04:29" */
    createdAt: string;
}

export interface TpayPersonContact {
    /** max length 255. */
    contact: string;
    /** default 1. */
    type?: number;
}

export interface TpayPosDates {
    /** max length 255. */
    create: string;
    /** max length 255. */
    modification: string;
}

export interface TpayPosSettings {
    /** max length 255. */
    confirmationCode: string;
    /** max length 255. */
    isTestMode: string;
}

export interface TpayBlikAliasPaymentData {
    /** 6 digit code generated in customer bank mobile app (required if customer does not have registered alias or when customer does not want to pay by registered device). length 6-6. */
    blikToken?: string | null;
    aliases?: TpayBlikAliasRegistration | null;
    /** Transaction type. List of available options: 0 - WEB mode 1 - POS mode dedicated for payment terminals 2 - Autopayment with only an alias, you need to register one first, see aliases field. default 0. */
    type?: 0 | 1 | 2 | null;
}

export interface TpayBlikAliasEvent {
    /** Event type */
    type: string;
    /** Event date */
    date: string;
}

export interface TpayMarketplaceMerchant {
    /** One of the merchant Ids taking part in the main transaction represented by ULID encoded in base32 */
    id: string;
}

export interface TpayProduct {
    /** Name of the product for easy differentiation by humans max length 255. */
    name?: string | null;
    /** Identifier of the product for easy differentiation by computers, eg. SKU */
    externalId: string;
    /** Quantity expressed as a floating-point number or a numeric string min 0 (exclusive). */
    quantity: number;
    /** Value of 1 unit of quantity in pennies min 0 (exclusive). */
    unitPrice: number;
}

export interface TpayMarketplaceChildRefund {
    /** e.g. "REF-XYZ" */
    title: string;
    /** Value in pennies ie. 123.45PLN should be passed as int: 12345. The sum of child transactions equals the total transaction value. Minimum one child transaction is required. */
    amount: number;
    /** e.g. "2024-10-16 23:34:39.000000" */
    date: string;
}

export interface TpayPaymentAttempt {
    /** Time of payment attempt */
    date: string;
    /** Error code if any occurred. Null if payment was successful. "63" - Wrong BLIK code. "100" - Unclassified error. "101" - Rejected by the payer. "102" - Transaction rejected by the issuer. "103" - Insufficient funds. "104" - Issuer or payer timeout. "105" - Transaction requires handling of the PAYID alias. "106" - Payer limit exceeded. "107" - Rejected for security reasons. */
    paymentErrorCode?: "63" | "100" | "101" | "102" | "103" | "104" | "105" | "106" | "107" | null;
}

export interface TpayBlikAlias {
    /** Alias generated in merchant system (unique for each customer) */
    value: string;
    /** Alias type */
    type: "UID" | "PAYID";
    /** How the alias will be shown in the payer's banking app */
    label: string;
    /** Alias key (returned by api call with error ERR82) in case of using non-unique alias. */
    key?: string | null;
    /** The parameter is available and required only in model O */
    recommendedAuthLevel?: "NOCONFREQ" | null;
    /** For PAYID aliases, a specification of how alias will be used - dates, amounts, frequency */
    autopayment?: TpayAutopayment | null;
    /** Skip 72h period during which bank attempts to inform the user about the reason for the lack of authorization. Available for Model A and O. */
    noDelay?: boolean | null;
}

export interface TpayPaymentDates {
    /** Time of booking transaction */
    realization?: string | null;
}

export interface TpayPaymentError {
    /** e.g. "payment_failed" */
    errorCode: string;
    /** e.g. "Podany kod jest nieprawidłowy, bądź utracił ważność" */
    errorMessage: string;
    /** e.g. "string" */
    fieldName?: string | null;
}

export interface TpayPayerUrls {
    /** Address to redirect used when payment was successful. max length 3072. */
    success?: string | null;
    /** Address to redirect used when errors occurred during payment process. max length 3072. */
    error?: string | null;
}

export interface TpayNotificationCallback {
    /** Result url for POST system notification max length 3072. */
    url?: string | null;
    /** Merchant email addresses used to send notification when payment is finished. */
    email?: string | null;
}

export interface TpayPayeeAddress {
    /** Street name max length 255. */
    street: string;
    /** House number max length 255. */
    houseNumber: string;
    /** Flat number max length 255. */
    flatNumber?: string | null;
    /** Postal code or zip code max length 255. */
    postalCode: string;
    /** Full city name max length 255. */
    city: string;
    /** Country code in ISO 3166-1 alfa-2 length 2-2. */
    country: string;
}

export interface TpayRefundNoAccountDates {
    /** Date when refund where scheduled. */
    create: string;
}

export interface TpayRefundCardDates {
    /** Date when refund where scheduled. */
    create: string;
    /** Date when refund where complete. */
    refund?: string | null;
}

export interface TpayImage {
    /** e.g. "https://secure.tpay.com/_/banks/b1.png" */
    url: string;
}

export interface TpayChannelGroup {
    /** e.g. "1" */
    id: string;
    /** e.g. "Group name" */
    name: string;
    image: TpayImage;
}

export interface TpayChannelConstraint {
    /** e.g. "amount" */
    field: string;
    /** e.g. "min" */
    type: string;
    /** e.g. "1.00" */
    value: string;
}

export interface TpayRefundContentExtra {
    /** Elavon EISOP Response code */
    responseCode: string;
    /** e.g. "Approved" */
    responseDescription: string;
}

export interface TpayBlikAliasRegistration {
    /** Alias generated in merchant system (unique for each customer) */
    value: string;
    /** Alias type */
    type: "UID" | "PAYID";
    /** How the alias will be shown in the payer's banking app */
    label: string;
    /** For PAYID aliases, a specification of how alias will be used - dates, amounts, frequency */
    autopayment?: TpayAutopayment | null;
}

export interface TpayAutopayment {
    /** Blik recursive payments model, A, M or O */
    model: "A" | "M" | "O";
    /** Model A: Frequency of payments in days, weeks, months or years */
    frequency: string;
    /** Limit of a single payment's amount, in main unit of currency */
    singleLimitAmount: number;
    /** Limit of total amount on all payments' made with this alias, in main unit of currency */
    totalLimitAmount: number;
    /** Currency in which limits are given. Currently supported: PLN. */
    currency: "PLN";
    /** The date on which the alias will first be used ISO 8601 date-time. */
    initDate: string;
    /** The date on which the alias will expire ISO 8601 date-time. */
    expirationDate: string;
}
export interface TpayPaginationParams {
    /** Page number. */
    page?: number;
    /** Limit per page, default is 35. */
    limit?: number;
}

export interface TpayDateRangeParams {
    /** Date and time in format `yyyy-mm-dd hh:mm:ss`. */
    from?: string;
    /** Date and time in format `yyyy-mm-dd hh:mm:ss`. */
    to?: string;
}

export interface TpayTransactionListParams extends TpayPaginationParams, TpayDateRangeParams {
    /** Transaction status. */
    status?: "paid" | "correct" | "pending" | "refund" | "canceled";
}

export interface TpayRefundListParams extends TpayPaginationParams, TpayDateRangeParams {
    /** Email of payer. Used only in `transactional` context. */
    payerEmail?: string;
    /** Title of transaction. Used only in `transactional` context. */
    transactionTitle?: string;
    /** Refunds context. Default is `transactional`. */
    context?: "transactional" | "card";
    /** Card token. Used only in `card` context. */
    token?: string;
}

export interface TpayBankGroupsParams {
    /** If set to true will return only online payment groups. */
    onlyOnline?: boolean;
}

/**
 * Transaction settlement notification, sent as `application/x-www-form-urlencoded`
 * to `callbacks.notification.url`. Answer with HTTP 200 and the body `TRUE`.
 *
 * Values arrive as strings because the body is form encoded.
 */
export interface TpayPaymentNotification {
    /** Merchant numeric identifier. */
    id: string;
    /** Transaction title assigned by Tpay, e.g. "TR-BRA-KGZK0X". */
    tr_id: string;
    /** Payment date. */
    tr_date: string;
    /** Value of the `hiddenDescription` parameter sent when creating the transaction. */
    tr_crc: string;
    /** Target transaction amount. */
    tr_amount: string;
    /** Amount actually paid by the payer. */
    tr_paid: string;
    /** Transaction description. */
    tr_desc: string;
    /** `true` for a successful payment, `chargeback` for a manual refund. */
    tr_status: "true" | "chargeback" | (string & {});
    /** Always `none`, kept for backwards compatibility. */
    tr_error: string;
    /** Payer's email address. */
    tr_email: string;
    /**
     * Checksum, `md5(id + tr_id + tr_amount + tr_crc + securityCode)`. Verified by
     * `TpayClient.parseNotification()` when `securityCode` is set in the config.
     */
    md5sum: string;
    /** `1` for a test transaction, `0` otherwise. */
    test_mode?: "0" | "1";
    /** Currency code compliant with ISO 4217. Sent for multi-currency accounts. */
    tr_currency?: string;
    /** Id of the payment channel used. */
    tr_channel?: string;
    /** Wallet used to pay, if any. */
    wallet?: string;
    /** `1` when the payment was made with Masterpass. */
    masterpass?: string;
    /** Card token, sent when the payer agreed to save their card. */
    card_token?: string;
    /** Token expiry date in `MMYY` format. */
    token_expiry_date?: string;
    /** Last four digits of the card number. */
    card_tail?: string;
    /** Card brand, e.g. "Visa" or "Mastercard". */
    card_brand?: string;
    tokenPaymentData_tokenValue?: string;
    tokenPaymentData_initialTransactionId?: string;
    /** Token expiry date in `MMYY` format. */
    tokenPaymentData_cardExpiryDate?: string;
    tokenPaymentData_cardBrand?: string;
    /** Last four digits of the card number. */
    tokenPaymentData_cardTail?: string;
}

/**
 * Card tokenization notification (tokenization without a charge), sent as `application/json`.
 * Answer with HTTP 200 and the body `{"result":true}`.
 */
export interface TpayTokenizationNotification {
    type: "tokenization" | "tokenization_eisop";
    data: {
        /** Id of the tokenization request returned by `createCardToken()`. */
        tokenizationId: string;
        /** Card token, 64 alphanumeric characters. */
        token: string;
        /** Card brand, e.g. "Visa" or "Mastercard". */
        cardBrand: string;
        /** Last four digits of the card number. */
        cardTail: string;
        /** Token expiry date in `MMYY` format. */
        tokenExpiryDate: string;
    };
}

/**
 * Card token status change notification, sent as `application/json`.
 * Answer with HTTP 200 and the body `{"result":true}`.
 */
export interface TpayTokenUpdateNotification {
    type: "token_update";
    data: {
        /** Card token whose status changed - fetch it with `getCardToken()`. */
        token: string;
    };
}

/**
 * Marketplace transaction notification, sent as `application/json`.
 * Answer with HTTP 200 and the body `{"result":true}`.
 */
export interface TpayMarketplaceTransactionNotification {
    type: "marketplace_transaction";
    data: {
        /** ULID of the parent transaction, encoded in base32. */
        transactionId: string;
        transactionTitle: string;
        transactionAmount: number;
        transactionPaidAmount: number;
        transactionStatus: "correct" | (string & {});
        /** Value of the `hiddenDescription` parameter sent when creating the transaction. */
        transactionHiddenDescription: string;
        payerEmail: string;
        transactionDate: string;
        transactionDescription: string;
        transactionBookingDate?: string;
        cardToken?: string;
    };
}

/**
 * BLIK alias lifecycle notification, sent as `application/x-www-form-urlencoded`.
 * Answer with HTTP 200 and the body `TRUE`.
 */
export interface TpayBlikAliasNotification {
    /** Merchant numeric identifier. */
    id: string;
    event: "ALIAS_REGISTER" | "ALIAS_UNREGISTER" | "ALIAS_UPDATE" | "ALIAS_EXPIRED";
    /** Checksum. Tpay does not document its formula for alias events, so the SDK leaves it alone. */
    md5sum: string;
    msg_value: {
        /** Alias value, unique per customer. */
        value: string;
        type: "UID" | "PAYID";
        /** Alias validity date. Sent for `ALIAS_REGISTER` and `ALIAS_UPDATE`. */
        expirationDate?: string;
    };
}

/**
 * Recurring (autopayment) schedule notification.
 * Answer with HTTP 200 and the body `TRUE`.
 */
export interface TpayRecurringNotification {
    recurringId: string;
    transactionId: string;
    /** Value of the `hiddenDescription` parameter sent when creating the transaction. */
    hiddenDescription: string;
    iterationCount: number;
    iterationAttemptCount: number;
    status: string;
    nextChargeDate?: string;
    /** Reason of a failed charge, if any. */
    reason?: string;
}

/**
 * Any notification Tpay can POST to your callback URL. Narrow it with `in`:
 * `"tr_id" in notification`, `"event" in notification`, `"recurringId" in notification`
 * or `notification.type`.
 */
export type TpayNotification =
    | TpayPaymentNotification
    | TpayTokenizationNotification
    | TpayTokenUpdateNotification
    | TpayMarketplaceTransactionNotification
    | TpayBlikAliasNotification
    | TpayRecurringNotification;
