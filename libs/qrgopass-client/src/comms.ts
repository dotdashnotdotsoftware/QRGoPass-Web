import { EncryptionServices } from "./encryption/encryption-services";

export type UserCredentials = {
    userIdentifier: string;
    password: string;
}

export enum FailureReason {
    TRANSFER_TIMEOUT = -1
}

export type QRGoPassFailure = {
    failureReason: FailureReason;
}

export type QRGoPassSession = {
    UUID: string;
    PublicKey: string;
}

export async function initialise(callback: (result: UserCredentials | QRGoPassFailure) => void): Promise<QRGoPassSession> {
    const FETCH_URL = "https://azk4l4g8we.execute-api.us-east-2.amazonaws.com/Prod?UUID="
    const FETCH_TIMEOUT = 3000;
    const FETCH_ATTEMPTS = 4;
    const CREDENTIAL_TRANSFER = 1;


    const encryptionServices = await EncryptionServices.createAsync();
    const uuid = encryptionServices.getUuid();
    const publicJWTBase64 = await encryptionServices.getPublicModulus();

    let loopCount = 0;
    const fetchLoop = async () => {
        loopCount++;

        if (FETCH_ATTEMPTS <= loopCount) {
            console.log("(Timeout)");
            callback({ failureReason: FailureReason.TRANSFER_TIMEOUT });
            return;
        }

        const fetchResult = await fetch(FETCH_URL + uuid, {
            cache: "no-store",
            headers: {
                'Accept': 'application/json'
            }
        }
        );

        const response = await fetchResult.json();
        if (!response) {
            console.log("loop");
            setTimeout(fetchLoop, FETCH_TIMEOUT);
            return;
        }

        if (CREDENTIAL_TRANSFER == response.V) {
            const data = response.Data;
            const userDecryptPromise = encryptionServices.decrypt(data.User);
            const passDecryptPromise = encryptionServices.decrypt(data.Pass);

            try {
                await Promise.all([userDecryptPromise, passDecryptPromise]);
            } catch (e) {
                console.log("ERROR: Could not decrypt credentials");
                return;
            }

            const loginInfo = {
                userIdentifier: await userDecryptPromise,
                password: await passDecryptPromise
            };

            if (!loginInfo.userIdentifier || !loginInfo.password) {
                console.log("ERROR: Could not decrypt credentials");
                return;
            }
            else {
                console.log("Successfully decrypted credentials");
                callback(loginInfo);
            }
            return;
        } else {
            console.log("Unsuppored right now");
            return;
        }
    }
    setTimeout(fetchLoop, FETCH_TIMEOUT);

    return {
        UUID: uuid,
        PublicKey: publicJWTBase64
    }
}
