
export type UserCredentials = {
    userIdentifier: string;
    password: string;
}

export type BackupKey = {
    keyInfo: string;
}

export enum FailureReason {
    TRANSFER_TIMEOUT = -1,
    DECRYPTION_FAILURE = -2,
    UNSUPPORTED_VERSION = -3,
    UNKNOWN_ERROR = -4,
    SUSPICIOUS_ACTIVITY = -5
}

export type QRGoPassFailure = {
    failureReason: FailureReason;
}

export function isUserCredentials(obj: any): obj is UserCredentials {
    return obj && typeof obj.userIdentifier === 'string' && typeof obj.password === 'string';
}

export function isBackupKey(obj: any): obj is BackupKey {
    return obj && typeof obj.keyInfo === 'string';
}

export function isQRGoPassFailure(obj: any): obj is QRGoPassFailure {
    return obj && typeof obj.failureReason === 'number';
}