import { UserCredentials, QRGoPassFailure, FailureReason, isQRGoPassFailure } from "./types";
import { EncryptionServices } from "./encryption/encryption-services";
import { IRemote } from "./remotes/i-remote";
import { AwsRemote } from "./remotes/aws/aws-remote";

export async function initialise(): Promise<QRGoPassSession> {
    const encryptionServices = await EncryptionServices.createAsync();
    const base64EncodedPublicKey = await encryptionServices.getPublicModulus();
    const uuid = encryptionServices.getUuid();

    return new QRGoPassSession(
        encryptionServices,
        uuid,
        base64EncodedPublicKey,
        new AwsRemote(uuid)
    );
}

export class QRGoPassSession {
    constructor(
        private readonly encryptionServices: EncryptionServices,
        readonly uuid: string,
        readonly base64EncodedPublicKey: string,
        private readonly remote: IRemote
    ) { }

    public async getCredentials(): Promise<UserCredentials | QRGoPassFailure> {
        const remoteResponse = await this.remote.getResponse();

        if (isQRGoPassFailure(remoteResponse)) {
            return remoteResponse as QRGoPassFailure;
        }

        return await getCredentials(this.encryptionServices, remoteResponse);
    }
}

async function getCredentials(encryptionServices: EncryptionServices, response: any): Promise<UserCredentials | QRGoPassFailure> {
    const CREDENTIAL_TRANSFER = 1;

    try {
        if (CREDENTIAL_TRANSFER == response.V) {
            const data = response.Data;
            const userDecryptPromise = encryptionServices.decrypt(data.User);
            const passDecryptPromise = encryptionServices.decrypt(data.Pass);

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
