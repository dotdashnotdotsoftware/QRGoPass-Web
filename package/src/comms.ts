export type UserCredentials = {
    userIdentifier: string;
    password: string;
}

export type QRGoPassSession = {
    GUID: string;
    PublicKey: string;
}

export function initialise(callback: (credentials: UserCredentials) => void): QRGoPassSession {
    window.setTimeout(() => {
        callback({
            userIdentifier: 'test',
            password: 'test'
        })
    }, 5000);

    return {
        GUID: crypto.randomUUID(),
        PublicKey: "TODO"
    }
}
