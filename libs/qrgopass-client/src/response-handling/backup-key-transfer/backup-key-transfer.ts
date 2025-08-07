import { EncryptionServices } from "../../encryption/encryption-services";
import { QRGoPassFailure, FailureReason, BackupKey } from "../../types";
import { IResponseHandler } from "../i-response-handler";

export const BACKUP_KEY_TRANSFER = 3;

export class BackupKeyHandler implements IResponseHandler {
    constructor(private readonly encryptionServices: EncryptionServices) { }

    public async handleResponse(response: any): Promise<QRGoPassFailure | BackupKey> {

        if (BACKUP_KEY_TRANSFER !== Number(response.V)) {
            return { failureReason: FailureReason.UNSUPPORTED_VERSION };
        }

        const data = response.Data;
        const keyInfoPromise = this.encryptionServices.decrypt(data.KeyInfo);

        try {
            await keyInfoPromise;
        } catch (e) {
            console.log("ERROR: Could not decrypt credentials");
            return { failureReason: FailureReason.DECRYPTION_FAILURE };
        }

        const keyInfo = await keyInfoPromise

        if (!keyInfo) {
            console.log("ERROR: Could not decrypt backup key");
            return { failureReason: FailureReason.DECRYPTION_FAILURE };
        } else {
            return {
                keyInfo
            };
        }
    }
}