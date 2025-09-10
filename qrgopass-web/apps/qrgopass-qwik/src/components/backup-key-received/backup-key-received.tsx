import { $, component$, NoSerialize, useStylesScoped$ } from '@builder.io/qwik';
import styles from './backup-key-received.css?inline';
import { AppButton } from '../app-button';
import { BackupKey } from 'qrgopass-client';
// @ts-expect-error - no types available for this package
import QRCode from 'qrcode-esm';

const BACKUP_KEY_QR = 4;

export class BackupKeyContainer {
    constructor(
        private readonly backupKey: BackupKey,
    ) { }

    asQRContents() {
        return JSON.stringify({
            Data: this.backupKey.keyInfo,
            V: BACKUP_KEY_QR,
        });
    }
}

interface Props {
  backupKey: NoSerialize<BackupKeyContainer>;
}

export const BackupKeyReceived = component$(({ backupKey }: Props) => {
    useStylesScoped$(styles)

    if(!backupKey) {
        return null;
    }

    const generateAndDownload = $(async () => {
        try {
            const qrText = backupKey.asQRContents()
            const dataUrl = await QRCode.toDataURL(qrText, {
                width: 300,
                margin: 2,
            });

            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'QRGoPass_Backup_Key.png';

            // Simulate a click without appending to the DOM
            link.dispatchEvent(new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
            }));
        } catch (err) {
            console.error('QR generation failed:', err);
        }
    });

    return (
        <>
            <img src="/logo_128.png" alt="QRGoPass Logo" height={128} width={128} />
            <h2>Credentials Received</h2>
            <div class="button-group">
                <AppButton onClick$={generateAndDownload}>
                    Download Key
                </AppButton>
            </div>
        </>
    );
});
