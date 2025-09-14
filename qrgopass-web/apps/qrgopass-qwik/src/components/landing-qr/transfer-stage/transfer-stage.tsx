import { $, component$, Signal, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import { QRGoPassFailure, UserCredentials } from 'qrgopass-client'
import { BackupKey } from 'qrgopass-client/dist/types';
import { TransferActive } from './transfer-active';
import { AppButton } from '~/components/app-button';
import styles from './transfer-stage.css?inline';



export const TransferStage = component$(({ transferState }: { transferState: Signal<UserCredentials | QRGoPassFailure | BackupKey | null> }) => {
    useStylesScoped$(styles);

    const userReady = useSignal(false);

    if (!userReady.value) {
        return <>
            <img src="/logo_128.png" alt="QRGoPass Logo" height={128} width={128} />
            <h2>Your Credentials, Delivered Securely.</h2>
            <div class="button-group">
                <AppButton onClick$={$(() => userReady.value = true)} >
                    Tap to Begin
                </AppButton>
            </div>
        </>
    }
    return <TransferActive transferState={transferState} />
});
