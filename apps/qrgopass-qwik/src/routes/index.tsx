import { component$, useSignal, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import styles from './landing.css?inline';
import { LandingQr } from '~/components/landing-qr';
import { CredentialsReceived, CredentialsRXContainer } from '~/components/credentials-received';

export default component$(() => {
    useStylesScoped$(styles);
    const rx_value = useSignal<CredentialsRXContainer | null>(null);

    return (
        <div>
            {rx_value.value === null ? <LandingQr credentials={rx_value} /> : <></>}
            {rx_value.value !== null ? <CredentialsReceived credentials={rx_value} /> : <></>}
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
