import { component$, Signal, useSignal, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
// @ts-expect-error - no types available for this package
import QRCode from 'qrcode-esm';
import { initialise, QRGoPassFailure, UserCredentials } from 'qrgopass-client'
import styles from "./transfer-stage.css?inline"
import { BackupKey } from 'qrgopass-client/dist/types';

const QRGOPASS_WEB_CRYPTO_CODE = 5;

export const TransferStage = component$(({ transferState }: { transferState: Signal<UserCredentials | QRGoPassFailure | BackupKey | null> }) => {
    const qrCodeSvg = useSignal<string>('');
    const qrCodeTimeout = useSignal<number>(0)
    useStylesScoped$(styles);

    useVisibleTask$(async () => {
        const session = await initialise();

        qrCodeTimeout.value = session.timeout;
        const scanData = { V: QRGOPASS_WEB_CRYPTO_CODE, UUID: session.uuid, Data: { Key: session.base64EncodedPublicKey } };
        QRCode.toString(JSON.stringify(scanData), { type: 'svg' })
            .then((svg: string) => {
                qrCodeSvg.value = svg;
            })
            .catch((err: any) => {
                console.error('Failed to generate QR code:', err);
            });

        // Disable as needed for manual testing
        if (false) {

            setTimeout(() => {
                // transferState.value = {
                //     userIdentifier: "username",
                //     password: "pass"
                // } satisfies UserCredentials

                // transferState.value = {
                //     failureReason: FailureReason.SUSPICIOUS_ACTIVITY
                // }

                // transferState.value = {
                //     keyInfo: "Demo Key"
                // }
            }, 2000)

            return
        }

        transferState.value = await session.getCredentials();
    });

    return <>
        <h2>Waiting for connection from mobile app...</h2>
        {qrCodeSvg.value ? (
            <div style={{ ["--timeout"]: `${qrCodeTimeout.value / 1000}s` }} dangerouslySetInnerHTML={qrCodeSvg.value} />
        ) : (
            <div class="generator">Generating QR code...</div>
        )}
    </>
});
