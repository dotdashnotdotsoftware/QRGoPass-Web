import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'
import { FailureReason, QRGoPassFailure, UserCredentials, initialise, isQRGoPassFailure } from 'qrgopass-client'

const B64ToUrlEncodedB64 = function (input: string): string {
  // Replace non-url compatible chars with base64 standard chars
  input = input
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  // Remove padding characters
  return input.replace("=", "");
};

async function main() {
  const qrGoPassSession = await initialise();
  const credentialsPromise = qrGoPassSession.getCredentials();
  document.getElementById('sessionId')!.innerHTML = qrGoPassSession.uuid;

  const jwk: JsonWebKey = {
    "alg": "RSA-OAEP-256",
    "e": "AQAB",
    "ext": true,
    "key_ops": [
      "encrypt"
    ],
    "kty": "RSA",
    "n": B64ToUrlEncodedB64(qrGoPassSession.base64EncodedPublicKey),
  }

  console.log(jwk)
  const publicJWTFoo = await window.crypto.subtle.importKey("jwk", jwk, {
    name: "RSA-OAEP",
    hash: "SHA-256"
  }, true, ["encrypt"]);

  const encrypted = await window.crypto.subtle.encrypt({
    name: "RSA-OAEP",
  },
    publicJWTFoo,
    new TextEncoder().encode("Banana")
  );

  console.log(encrypted);

  const FETCH_URL = `https://azk4l4g8we.execute-api.us-east-2.amazonaws.com/Prod?UUID=${qrGoPassSession.uuid}`;
  const fakeInfo = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  const payload = {
    UUID: qrGoPassSession.uuid,
    V: "1",
    Data: {
      User: fakeInfo,
      Pass: fakeInfo
    }
  };

  console.log(JSON.stringify(payload));
  try {
    await fetch(FETCH_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });
  } catch (e) {
    console.error("Error posting credentials", e);
  }

  const result = await credentialsPromise;

  if (isQRGoPassFailure(result)) {
    const failure = result as QRGoPassFailure;
    if (failure.failureReason === FailureReason.TRANSFER_TIMEOUT) {
      document.getElementById('sessionId')!.innerHTML = "TIMED OUT";
    } else if (failure.failureReason === FailureReason.UNSUPPORTED_VERSION) {
      document.getElementById('sessionId')!.innerHTML = "UNSUPPORTED VERSION";
    }
    console.log(result);
  } else {
    const credentials = result as UserCredentials;
    document.getElementById('userIdentifier')!.innerHTML = credentials.userIdentifier;
    document.getElementById('password')!.innerHTML = credentials.password;
  }
}
main()