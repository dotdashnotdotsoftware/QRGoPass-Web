import { component$, Signal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './credentials-received.css?inline';

export class CredentialsRXContainer {
    constructor(
        readonly user: string,
        readonly password: string,
    ) { }
}

export const CredentialsReceived = component$(({ credentials }: { credentials: Signal<CredentialsRXContainer | null> }) => {
    useStylesScoped$(styles)

    if (credentials.value === null) {
        return null;
    }

    return (
        <div>
            <img src="/logo_128.png" alt="QRGoPass Logo" />
            <h2>Credentials Received</h2>
            <div class="button-group">
                <button class="copy-button" onClick$={() => { console.log("Copy button clicked") }}>
                    Copy User
                </button>
                <button class="copy-button" onClick$={() => { console.log("Copy button clicked") }}>
                    Copy Password
                </button>
                <button class="copy-button" onClick$={() => { console.log("Copy button clicked") }}>
                    Clear Clipboard
                </button>
            </div>
        </div >
    );
});
