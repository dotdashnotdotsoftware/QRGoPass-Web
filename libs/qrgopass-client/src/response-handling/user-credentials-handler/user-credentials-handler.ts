import { EncryptionServices } from "../../encryption/encryption-services";
import { UserCredentials, QRGoPassFailure, FailureReason } from "../../types";
import { IResponseHandler } from "../i-response-handler";

export const CREDENTIAL_TRANSFER = 1;

export class UserCredentialsHandler implements IResponseHandler {
    constructor(private readonly encryptionServices: EncryptionServices) { }

    public async handleResponse(response: any): Promise<UserCredentials | QRGoPassFailure> {

        if (CREDENTIAL_TRANSFER !== response.V) {
            console.log("Unsuppored right now");
            return { failureReason: FailureReason.UNSUPPORTED_VERSION };
        }

        const data = response.Data;
        const userDecryptPromise = this.encryptionServices.decrypt(data.User);
        const passDecryptPromise = this.encryptionServices.decrypt(data.Pass);

        try {
            await Promise.all([userDecryptPromise, passDecryptPromise]);
        } catch (e) {
            console.log("ERROR: Could not decrypt credentials");
            return { failureReason: FailureReason.DECRYPTION_FAILURE };
        }

        const loginInfo = {
            userIdentifier: await userDecryptPromise,
            password: await passDecryptPromise
        } satisfies UserCredentials;

        if (!loginInfo.userIdentifier || !loginInfo.password) {
            console.log("ERROR: Could not decrypt credentials");
            return { failureReason: FailureReason.DECRYPTION_FAILURE };
        } else {
            console.log("Successfully decrypted credentials");
            return loginInfo;
        }
    }
}