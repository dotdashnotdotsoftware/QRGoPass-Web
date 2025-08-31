import { component$, Signal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './backup-key-received.css?inline';
import { AppButton } from '../app-button';
import { BackupKey } from 'qrgopass-client';

export class BackupKeyContainer {
    constructor(
        private readonly backupKey: BackupKey,
    ) { }

    asQRContents() {
        return "AAA"
    }
}

export const BackupKeyReceived = component$(({ backupKey }: { backupKey: Signal<BackupKeyContainer | null> }) => {
    useStylesScoped$(styles)

    if (backupKey.value === null) {
        return null;
    }

    return (
        <>
            <img src="/logo_128.png" alt="QRGoPass Logo" height={128} width={128} />
            <h2>Credentials Received</h2>
            <div class="button-group">
                <AppButton onClick$={() => {
                    console.log("Download the key")
                }}>
                    Download Key
                </AppButton>
            </div>
        </>
    );
});
