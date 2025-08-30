import { component$, Signal, useSignal, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
// @ts-expect-error - no types available for this package
import QRCode from 'qrcode-esm';
import { initialise, UserCredentials } from 'qrgopass-client'
import { CredentialsRXContainer } from '../../credentials-received';
import styles from "./transfer-stage.css?inline"

const QRGOPASS_WEB_CRYPTO_CODE = 5;

export const TransferStage = component$(({ credentials }: { credentials: Signal<CredentialsRXContainer | null> }) => {
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
            // setTimeout(() => {
            //     credentials.value = new CredentialsRXContainer("result.userIdentifier", "result.password")
            // }, 2000)

            return
        }

        const result = await session.getCredentials() as UserCredentials;

        console.log("result", result)
        if (result.userIdentifier) {
            credentials.value = new CredentialsRXContainer(result.userIdentifier, result.password)
        }
    });

    return <>
        <h2>Waiting for connection from mobile app...</h2>
        {qrCodeSvg.value ? (
            <div style={{ ["--timeout"]: `${qrCodeTimeout.value / 1000}s` }} dangerouslySetInnerHTML={qrCodeSvg.value} />
        ) : (
            <p>Generating QR code...</p>
        )}
    </>
});
