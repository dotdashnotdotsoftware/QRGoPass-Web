export type UserCredentials = {
    userIdentifier: string;
    password: string;
}

export function initialise(callback: (credentials: UserCredentials) => void): void {
    window.setTimeout(() => {
        callback({
            userIdentifier: 'test',
            password: 'test'
        })
    }, 5000);
}
