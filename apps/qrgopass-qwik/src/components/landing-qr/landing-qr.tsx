import { component$, Signal, useSignal, useVisibleTask$ } from '@builder.io/qwik';
// @ts-expect-error - no types available for this package
import QRCode from 'qrcode-esm';
import { initialise, UserCredentials } from 'qrgopass-client'
import { CredentialsRXContainer } from '../credentials-received';

const QRGOPASS_WEB_CRYPTO_CODE = 5;

export const LandingQr = component$(({ credentials }: { credentials: Signal<CredentialsRXContainer | null> }) => {
    const qrCodeSvg = useSignal<string>('');

    useVisibleTask$(async () => {
        const session = await initialise();

        const scanData = { V: QRGOPASS_WEB_CRYPTO_CODE, UUID: session.uuid, Data: { Key: session.base64EncodedPublicKey } };
        QRCode.toString(JSON.stringify(scanData), { type: 'svg' })
            .then((svg: string) => {
                qrCodeSvg.value = svg;
            })
            .catch((err: any) => {
                console.error('Failed to generate QR code:', err);
            });

        // Disable as needed for manual testing
        if (true) return

        const result = await session.getCredentials() as UserCredentials;

        if (result.userIdentifier) {
            credentials.value = new CredentialsRXContainer(result.userIdentifier, result.password)
        }
    });

    return <>
        <h2>Scan to visit QRGoPass!</h2>
        {qrCodeSvg.value ? (
            <div dangerouslySetInnerHTML={qrCodeSvg.value} />
        ) : (
            <p>Generating QR code...</p>
        )}
    </>
});
