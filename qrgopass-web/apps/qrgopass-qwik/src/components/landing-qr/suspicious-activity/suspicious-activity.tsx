import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './suspicious-activity.css?inline';
import { AppButton } from '~/components/app-button';

interface SuspiciousActivityErrorProps {
    onRetry$: () => void;
}

export const SuspiciousActivityError = component$<SuspiciousActivityErrorProps>(({ onRetry$ }) => {
    useStylesScoped$(styles)

    return (
        <>
            <img src="/logo_128.png" alt="QRGoPass Logo" height={128} width={128} />
            <h2>Suspicious Activity...</h2>
            <div class="message">
                Someone appears to have downloaded the transferred encrypted details before you did, this should not happen.<br />
                <b>Be suspicious/aware of your surroundings.</b>
            </div>
            <div class="button-group">
                <AppButton onClick$={onRetry$}>
                    Retry
                </AppButton>
            </div>
        </>
    );
});
