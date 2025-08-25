import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from "./header.css?inline";
import moduleStyles from "./header.module.css";
import { Link } from '@builder.io/qwik-city';

export const Header = component$(() => {
    useStylesScoped$(styles);

    return (
        <header>
            <div class="left-links">
                <a href="/index.html">
                    {/* eslint-disable-next-line qwik/jsx-img */}
                    <img src="/logo_32.png" />
                    QRGoPass
                </a>
            </div>
            <div class="right-links">
                <a href="/about.html">What is this?</a>
                <Link href="/information" class={moduleStyles["nav-link"]}>Information</Link>
                <a href="/faqs.html">FAQs</a>
            </div>
        </header>
    );
});