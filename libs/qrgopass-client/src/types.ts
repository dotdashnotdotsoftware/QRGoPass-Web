
export type UserCredentials = {
    userIdentifier: string;
    password: string;
}

export enum FailureReason {
    TRANSFER_TIMEOUT = -1,
    DECRYPTION_FAILURE = -2,
    UNSUPPORTED_VERSION = -3,
    UNKNOWN_ERROR = -4
}

export type QRGoPassFailure = {
    failureReason: FailureReason;
}

export function isQRGoPassFailure(obj: any): obj is QRGoPassFailure {
    return obj && typeof obj.failureReason === 'number';
}