import { EncryptionServices } from "./encryption/encryption-services";
import { fetchInterval } from "./fetch-interval";

export type UserCredentials = {
    userIdentifier: string;
    password: string;
}

export enum FailureReason {
    TRANSFER_TIMEOUT = -1,
    DECRYPTION_FAILURE = -2,
    UNSUPPORTED_VERSION = -3,
}

export type QRGoPassFailure = {
    failureReason: FailureReason;
}

export async function initialise(): Promise<QRGoPassSession> {
    const encryptionServices = await EncryptionServices.createAsync();
    const base64EncodedPublicKey = await encryptionServices.getPublicModulus();
    const uuid = encryptionServices.getUuid();

    return new QRGoPassSession(encryptionServices, uuid, base64EncodedPublicKey);
}

export class QRGoPassSession {
    constructor(
        private readonly encryptionServices: EncryptionServices,
        readonly uuid: string,
        readonly base64EncodedPublicKey: string
    ) { }

    public async getCredentials(): Promise<UserCredentials | QRGoPassFailure> {
        return await getCredentials(this.encryptionServices, this.uuid);
    }
}

async function getCredentials(encryptionServices: EncryptionServices, uuid: string): Promise<UserCredentials | QRGoPassFailure> {
    const FETCH_URL = "https://azk4l4g8we.execute-api.us-east-2.amazonaws.com/Prod?UUID="
    const FETCH_TIMEOUT = 3000;
    const FETCH_ATTEMPTS = 4;
    const CREDENTIAL_TRANSFER = 1;

    try {
        const response = await fetchInterval(
            async () => {
                const fetchResult = await fetch(FETCH_URL + uuid, {
                    cache: "no-store",
                    headers: {
                        'Accept': 'application/json'
                    }
                }
                );

                const response = await fetchResult.json();
                if (!response) {
                    return {
                        done: false
                    };
                } else {
                    return {
                        done: true,
                        result: response
                    }
                }
            },
            FETCH_ATTEMPTS,
            FETCH_TIMEOUT
        );

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
        if (e === "TOO_MANY_LOOPS") {
            console.log("(Timeout)");
            return { failureReason: FailureReason.TRANSFER_TIMEOUT };
        }
    }
}
