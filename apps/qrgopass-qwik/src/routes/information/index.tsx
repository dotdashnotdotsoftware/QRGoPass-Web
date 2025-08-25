import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';
import styles from './information.css?inline';
import stylesModule from './information.module.css';

export default component$(() => {
    useStylesScoped$(styles);

    return (
        <article class={stylesModule["info-article"]}>
            <h1>Information</h1>
            <div>For any extra details, please don't hesitate to contact us on dotdashnotdotsoftware (at) gmail.com</div>
            <ul>
                <li>
                    <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                    <Link href="/terms">Terms of Use</Link>
                </li>
            </ul>
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
