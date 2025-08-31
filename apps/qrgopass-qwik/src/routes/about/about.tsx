import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import styles from './about.css?inline';

export const About = component$(() => {
    useStylesScoped$(styles);

    return (
        <article>
            <h1>About Page</h1>
        </article>
    );
});

export const head: DocumentHead = {
    title: "QRGoPass Explained",
    meta: [
        {
            name: "QRGoPass Explained",
            content: "How to use the QRGoPass web application and mobile application.",
        },
    ],
};
