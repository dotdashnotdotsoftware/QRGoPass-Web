import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from "./header.css?inline";

export const Header = component$(() => {
    useStylesScoped$(styles);

    return (
        <header>
            I AM A HEADER
        </header>
    );
});