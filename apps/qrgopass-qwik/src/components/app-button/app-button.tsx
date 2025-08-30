import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import type { JSX } from '@builder.io/qwik';
import styles from './app-button.css?inline';

type AppButtonProps = JSX.IntrinsicElements['button'];

export const AppButton = component$<AppButtonProps>((props) => {
    useStylesScoped$(styles);

    return (
        <button {...props}>
            <Slot />
        </button>
    );
});