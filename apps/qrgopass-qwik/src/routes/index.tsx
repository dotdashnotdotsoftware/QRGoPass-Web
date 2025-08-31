import { component$, Signal, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import styles from './landing.css?inline';
import { LandingQr } from '~/components/landing-qr';
import { CredentialsReceived, CredentialsRXContainer } from '~/components/credentials-received';
import { BackupKeyContainer, BackupKeyReceived } from '~/components/backup-key-received';

const ActiveUI = component$(({ rx_value }: { rx_value: Signal<CredentialsRXContainer | BackupKeyContainer | null> }) => {

    if (rx_value.value === null) {
        return <LandingQr rx_signal={rx_value} />
    }

    if ((rx_value as Signal<CredentialsRXContainer>).value.copyUserToClipboard !== undefined) {
        return <CredentialsReceived credentials={rx_value as Signal<CredentialsRXContainer>} />
    }

    if ((rx_value as Signal<BackupKeyContainer>).value.asQRContents !== undefined) {
        return <BackupKeyReceived backupKey={rx_value as Signal<BackupKeyContainer>} />
    }

    return null
})

export default component$(() => {
    useStylesScoped$(styles);
    const rx_value = useSignal<CredentialsRXContainer | BackupKeyContainer | null>(null);

    return (
        <div>
            <ActiveUI rx_value={rx_value} />
        </div>
    );
});

export const head: DocumentHead = {
    title: "QRGoPass",
    meta: [
        {
            name: "QRGoPass Main Application Page",
            content: "Landing page for the QRGoPass application and website.",
        },
    ],
};
