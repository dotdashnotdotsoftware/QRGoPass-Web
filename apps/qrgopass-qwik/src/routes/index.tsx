import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import styles from './landing.css?inline';
import { LandingQr } from '~/components/landing-qr';

export default component$(() => {
    useStylesScoped$(styles);

    return (
        <div style={{ width: "50%" }}>
            <h2>Scan to visit QRGoPass!</h2>
            <LandingQr />
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
