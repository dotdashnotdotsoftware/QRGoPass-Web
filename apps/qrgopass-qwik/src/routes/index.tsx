import { component$, useSignal, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import styles from './landing.css?inline';
// @ts-expect-error - no types available for this package
import QRCode from 'qrcode-esm';


export default component$(() => {
    useStylesScoped$(styles);
    const qrCodeSvg = useSignal<string>('');

    useVisibleTask$(() => {
        const copilotUrl = 'https://qrgopass.com';
        QRCode.toString(copilotUrl, { type: 'svg' })
            .then((svg: string) => {
                qrCodeSvg.value = svg;
            })
            .catch((err: any) => {
                console.error('Failed to generate QR code:', err);
            });
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
