import { component$, Signal } from '@builder.io/qwik';

export class CredentialsRXContainer {
    constructor(
        readonly user: string,
        readonly password: string,
    ) { }
}

export const CredentialsReceived = component$(({ credentials }: { credentials: Signal<CredentialsRXContainer | null> }) => {
    if (credentials.value === null) {
        return null;
    }

    return (
        <div>
            <img src="/logo_128.png" alt="QRGoPass Logo" />
            <h2>Credentials Received</h2>
            <p>User: {credentials.value.user}</p>
            <p>Password: {credentials.value.password}</p>
        </div>
    )
});
