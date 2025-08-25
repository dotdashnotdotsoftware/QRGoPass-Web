import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import styles from './privacy.css?inline';

export default component$(() => {
    useStylesScoped$(styles);

    return (
        <article>
            <h1>Privacy Policy</h1>

            <div class="textFull">
                <h2>Website</h2>
                <ul>
                    <li>At this point in time, www.qrgopass.com does not collect any data</li>
                </ul>
                <h2>App - QRGoPass</h2>
                <ul>
                    <li>Camera - The QRGoPass app uses your camera to scan QR barcodes. No images are stored and the camera is only active while the preview is shown on screen.</li>
                    <li>Logon details - The QRGoPass app stores your details solely in your device's internal storage. While in transit through the cloud they are encrypted using a random key and as such are unable to be read. After 10 minutes, our database provider will delete the data uploaded upon their next clean-up cycle.</li>
                </ul>
            </div>
        </article>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};
