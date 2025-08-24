import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from "./footer.css?inline";

const currentYear = new Date().getFullYear();

export const Footer = component$(() => {
    useStylesScoped$(styles);

    return (
        <footer>
            © {currentYear} QRGoPass. All rights reserved.
        </footer>
    );
});