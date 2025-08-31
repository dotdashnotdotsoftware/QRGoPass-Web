import { $, component$, Signal, useSignal, useTask$ } from "@builder.io/qwik";
import { TransferStage } from "./transfer-stage";
import { CredentialsRXContainer } from "../credentials-received";
import { QRGoPassFailure, UserCredentials, BackupKey, isUserCredentials, isQRGoPassFailure, FailureReason } from "qrgopass-client";
import { TimedOut } from "./timed-out";
import { UnexpectedError } from "./unexpected-error";
import { SuspiciousActivityError } from "./suspicious-activity";

export const LandingQr = component$(({ credentials }: { credentials: Signal<CredentialsRXContainer | null> }) => {
    const transferStateSignal = useSignal<UserCredentials | QRGoPassFailure | BackupKey | null>(null)

    useTask$(({ track }) => {
        track(() => transferStateSignal.value);
        const value = transferStateSignal.value
        if (isUserCredentials(value)) {
            credentials.value = new CredentialsRXContainer(value.userIdentifier, value.password)
        }
    });

    const handleRetry = $(() => {
        transferStateSignal.value = null
    });

    if (transferStateSignal.value === null) {
        return <TransferStage transferState={transferStateSignal} />
    }

    const { value: transferState } = transferStateSignal
    if (isQRGoPassFailure(transferState)) {
        if (transferState.failureReason === FailureReason.TRANSFER_TIMEOUT) {
            return <TimedOut onRetry$={handleRetry} />
        }

        if (FailureReason.SUSPICIOUS_ACTIVITY === transferState.failureReason) {
            return <SuspiciousActivityError onRetry$={handleRetry} />
        }

        if ([FailureReason.DECRYPTION_FAILURE, FailureReason.UNKNOWN_ERROR, FailureReason.UNSUPPORTED_VERSION].includes(transferState.failureReason)) {
            return <UnexpectedError onRetry$={handleRetry} />
        }
    }

    console.error("Unexpected UI state...")
    return <UnexpectedError onRetry$={handleRetry} />
})