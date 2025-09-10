import { urlEncodedB64ToB64 } from "../encoding/url-encoded-b64-to-b64";
import { getUuid } from "./get-uuid";

export class EncryptionServices {
    private constructor(private readonly keyPair: CryptoKeyPair) { }

    static async createAsync(): Promise<EncryptionServices> {
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


        return new EncryptionServices(keyPair);
    }

    readonly decrypt = async (base64) => {
        const ciphertext = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
        try {
            const decryptedValue = await window.crypto.subtle.decrypt(
                {
                    name: "RSA-OAEP"
                },
                this.keyPair.privateKey,
                ciphertext
            );

            return new TextDecoder().decode(decryptedValue);
        } catch (e) {
            console.log(e);
            return;
        }
    }

    readonly getUuid = getUuid

    readonly getPublicModulus = async () => {
        const publicJWT = await window.crypto.subtle.exportKey("jwk", this.keyPair.publicKey);
        const publicJWTBase64 = urlEncodedB64ToB64(publicJWT.n);
        return publicJWTBase64;
    }
}