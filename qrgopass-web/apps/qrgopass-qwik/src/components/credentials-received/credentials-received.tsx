import { $, component$, NoSerialize, useSignal, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
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

    const userBtnRef = useSignal<HTMLButtonElement>();
    const passBtnRef = useSignal<HTMLButtonElement>();
    const clearBtnRef = useSignal<HTMLButtonElement>();

    const animateClick = $((el?: HTMLElement) => {
        if (!el) return;

        // Apply inline styles
        el.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease';
        el.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.8)';
        el.style.transform = 'scale(1.05)';

        // Reset after animation
        setTimeout(() => {
            el.style.boxShadow = '';
            el.style.transform = '';
        }, 400);
    });


    const copyUser = $(() => {
        credentials?.copyUserToClipboard()
        animateClick(userBtnRef.value);
    });
    const copyPassword = $(() => {
        credentials?.copyPasswordToClipboard()
        animateClick(passBtnRef.value);
    });
    const clear = $(() => {
        credentials?.clearClipboard()
        animateClick(clearBtnRef.value);
    });

    useVisibleTask$(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case "x":
                        e.preventDefault();
                        userBtnRef.value?.click();
                        break;
                    case 'c':
                        e.preventDefault();
                        passBtnRef.value?.click();
                        break;
                    case 'v':
                        e.preventDefault();
                        clearBtnRef.value?.click();
                        break;
                }
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    });

    return (
        <>
            <img src="/logo_128.png" alt="QRGoPass Logo" height={128} width={128} />
            <h2>Credentials Received</h2>
            <div class="button-group">
                <AppButton ref={userBtnRef} onClick$={copyUser}>
                    Copy User (Ctrl+X)
                </AppButton>
                <AppButton ref={passBtnRef} onClick$={copyPassword}>
                    Copy Password (Ctrl+C)
                </AppButton>
                <AppButton ref={clearBtnRef} onClick$={clear}>
                    Clear Clipboard (Ctrl+V)
                </AppButton>
            </div>
        </>
    );
});
