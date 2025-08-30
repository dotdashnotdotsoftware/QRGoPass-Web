import { $, component$, Signal, useSignal, useTask$ } from "@builder.io/qwik";
import { TransferStage } from "./transfer-stage";
import { CredentialsRXContainer } from "../credentials-received";
import { QRGoPassFailure, UserCredentials, BackupKey, isUserCredentials } from "qrgopass-client";
import { TimedOut } from "./timed-out";

export const LandingQr = component$(({ credentials }: { credentials: Signal<CredentialsRXContainer | null> }) => {
    const transferState = useSignal<UserCredentials | QRGoPassFailure | BackupKey | null>(null)

    useTask$(({ track }) => {
        track(() => transferState.value);
        const value = transferState.value
        if (isUserCredentials(value)) {
            credentials.value = new CredentialsRXContainer(value.userIdentifier, value.password)
        }
    });

    const handleRetry = $(() => {
        transferState.value = null
    });

    if (transferState.value === null) {
        return <TransferStage transferState={transferState} />
    }

    return <TimedOut onRetry$={handleRetry} />
})