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

const urlEncodedB64ToB64 = function(input) {
    // Replace non-url compatible chars with base64 standard chars
    input = input
    .replace(/-/g, '+')
    .replace(/_/g, '/');
    // Pad out with standard base64 required padding characters
    var pad = input.length % 4;
    if(pad) {
        if(pad === 1) {
            throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
        }
        input += new Array(5-pad).join('=');
    }
    return input;
};

export async function initialise(callback: (result: UserCredentials | QRGoPassFailure) => void): Promise<QRGoPassSession> {
    const FETCH_URL = "https://azk4l4g8we.execute-api.us-east-2.amazonaws.com/Prod?UUID="
    const FETCH_TIMEOUT = 3000;
    const FETCH_ATTEMPTS = 4;
    const CREDENTIAL_TRANSFER = 1;

    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 1024,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );

    const decrypt = async (base64) => {
        const ciphertext = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
        try {
            const decryptedValue = await window.crypto.subtle.decrypt(
                {
                    name: "RSA-OAEP"
                },
                keyPair.privateKey,
                ciphertext
            );

            return new TextDecoder().decode(decryptedValue);
        } catch (e) {
            console.log(e);
            return;
        }
    }

    const publicJWT = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
    const publicJWTBase64 = urlEncodedB64ToB64(publicJWT.n);
    const uuid = crypto.randomUUID();

    let loopCount = 0;
    const fetchLoop = async () => {
        loopCount++;

        if(FETCH_ATTEMPTS <= loopCount)
        {
            console.log("(Timeout)");
            callback({failureReason: FailureReason.TRANSFER_TIMEOUT});
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

        if(CREDENTIAL_TRANSFER == response.V)
        {
            const data = response.Data;
            const userDecryptPromise = decrypt(data.User);
            const passDecryptPromise = decrypt(data.Pass);

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

            if(!loginInfo.userIdentifier || !loginInfo.password) {
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
