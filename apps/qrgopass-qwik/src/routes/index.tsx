import { component$, useSignal, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import styles from './landing.css?inline';
// @ts-expect-error - no types available for this package
import QRCode from 'qrcode-esm';
import { initialise } from 'qrgopass-client'


const QRGOPASS_WEB_CRYPTO_CODE = 5;

export default component$(() => {
    useStylesScoped$(styles);
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

    return (
        <div style={{ width: "50%" }}>
            <h2>Scan to visit QRGoPass!</h2>
            {qrCodeSvg.value ? (
                <div dangerouslySetInnerHTML={qrCodeSvg.value} />
            ) : (
                <p>Generating QR code...</p>
            )}
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
