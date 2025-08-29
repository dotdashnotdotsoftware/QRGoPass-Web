import { component$, Signal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './credentials-received.css?inline';
import { pushIntoClipboard } from '~/utils/clipboard';

export class CredentialsRXContainer {
    constructor(
        private readonly user: string,
        private readonly password: string,
    ) { }

    copyUserToClipboard() {
        pushIntoClipboard(this.user);
    }

    copyPasswordToClipboard() {
        pushIntoClipboard(this.password);
    }

    clearClipboard() {
        pushIntoClipboard('');
    }
}

export const CredentialsReceived = component$(({ credentials }: { credentials: Signal<CredentialsRXContainer | null> }) => {
    useStylesScoped$(styles)

    if (credentials.value === null) {
        return null;
    }

    return (
        <>
            <img src="/logo_128.png" alt="QRGoPass Logo" height={128} width={128} />
            <h2>Credentials Received</h2>
            <div class="button-group">
                <button class="copy-button" onClick$={() => {
                    credentials.value?.copyUserToClipboard();
                }}>
                    Copy User
                </button>
                <button class="copy-button" onClick$={() => {
                    credentials.value?.copyPasswordToClipboard();
                }}>
                    Copy Password
                </button>
                <button class="copy-button" onClick$={() => {
                    credentials.value?.clearClipboard();
                }}>
                    Clear Clipboard
                </button>
            </div>
        </>
    );
});
