import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
// @ts-expect-error - no types available for this package
import QRCode from 'qrcode-esm';
import { initialise } from 'qrgopass-client'

const QRGOPASS_WEB_CRYPTO_CODE = 5;

export const LandingQr = component$(() => {
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

        if (false) {
            const result = await session.getCredentials();
            console.log("Credentials result:", result);
        }
    });

    return qrCodeSvg.value ? (
        <div dangerouslySetInnerHTML={qrCodeSvg.value} />
    ) : (
        <p>Generating QR code...</p>
    )
});
