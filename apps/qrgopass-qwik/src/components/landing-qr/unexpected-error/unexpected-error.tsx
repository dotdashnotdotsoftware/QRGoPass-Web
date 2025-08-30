import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './unexpected-error.css?inline';

interface UnexpectedErrorProps {
    onRetry$: () => void;
}

export const UnexpectedError = component$<UnexpectedErrorProps>(({ onRetry$ }) => {
    useStylesScoped$(styles)

    return (
        <>
            <img src="/logo_128.png" alt="QRGoPass Logo" height={128} width={128} />
            <h2>An unexpected error occurred...</h2>
            <div class="button-group">
                <button class="copy-button" onClick$={onRetry$}>
                    Retry
                </button>
            </div>
        </>
    );
});
