import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './timed-out.css?inline';

interface TimedOutProps {
    onRetry$: () => void;
}

export const TimedOut = component$<TimedOutProps>(({ onRetry$ }) => {
    useStylesScoped$(styles)

    return (
        <>
            <img src="/logo_128.png" alt="QRGoPass Logo" height={128} width={128} />
            <h2>Credential Transfer Timed Out</h2>
            <div class="button-group">
                <button class="copy-button" onClick$={onRetry$}>
                    Retry
                </button>
            </div>
        </>
    );
});
