import { EncryptionServices } from "../../encryption/encryption-services";
import { UserCredentials, QRGoPassFailure, FailureReason } from "../../types";

export class UserCredentialsHandler {
    constructor(private readonly encryptionServices: EncryptionServices) { }

    public async handleResponse(response: any): Promise<UserCredentials | QRGoPassFailure> {
        const CREDENTIAL_TRANSFER = 1;

        try {
            if (CREDENTIAL_TRANSFER == response.V) {
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
                }
                else {
                    console.log("Successfully decrypted credentials");
                    return loginInfo;
                }
            } else {
                console.log("Unsuppored right now");
                return { failureReason: FailureReason.UNSUPPORTED_VERSION };
            }
        } catch (e) {
            console.error("Error processing remote response", e);
            return { failureReason: FailureReason.UNKNOWN_ERROR };
        }
    }
}