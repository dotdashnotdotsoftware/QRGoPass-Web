import { $, component$, NoSerialize, useStylesScoped$ } from '@builder.io/qwik';
import styles from './credentials-received.css?inline';
import { pushIntoClipboard } from '~/utils/clipboard';
import { AppButton } from '../app-button';

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

interface Props {
  credentials: NoSerialize<CredentialsRXContainer>;
}

export const CredentialsReceived = component$(({ credentials }: Props) => {
    useStylesScoped$(styles)

    const copyUser = $(() => credentials?.copyUserToClipboard());
    const copyPassword = $(() => credentials?.copyPasswordToClipboard());
    const clear = $(() => credentials?.clearClipboard());

    return (
        <>
            <img src="/logo_128.png" alt="QRGoPass Logo" height={128} width={128} />
            <h2>Credentials Received</h2>
            <div class="button-group">
                <AppButton onClick$={copyUser}>
                    Copy User
                </AppButton>
                <AppButton onClick$={copyPassword}>
                    Copy Password
                </AppButton>
                <AppButton onClick$={clear}>
                    Clear Clipboard
                </AppButton>
            </div>
        </>
    );
});
