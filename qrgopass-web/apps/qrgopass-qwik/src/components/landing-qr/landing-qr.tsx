import { $, component$, Signal, useSignal, useTask$ } from "@builder.io/qwik";
import { TransferStage } from "./transfer-stage";
import { CredentialsRXContainer } from "../credentials-received";
import { QRGoPassFailure, UserCredentials, BackupKey, isUserCredentials, isQRGoPassFailure, FailureReason, isBackupKey } from "qrgopass-client";
import { TimedOut } from "./timed-out";
import { UnexpectedError } from "./unexpected-error";
import { SuspiciousActivityError } from "./suspicious-activity";
import { BackupKeyContainer } from "../backup-key-received";

export const LandingQr = component$(({ rx_signal }: { rx_signal: Signal<CredentialsRXContainer | BackupKeyContainer | null> }) => {
    const transferStateSignal = useSignal<UserCredentials | QRGoPassFailure | BackupKey | null>(null)

    useTask$(({ track }) => {
        track(() => transferStateSignal.value);
        const value = transferStateSignal.value
        if (isUserCredentials(value)) {
            rx_signal.value = new CredentialsRXContainer(value.userIdentifier, value.password)
        }

        if (isBackupKey(value)) {
            rx_signal.value = new BackupKeyContainer(value)
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
            return <TimedOut onRetry={handleRetry} />
        }

        if (FailureReason.SUSPICIOUS_ACTIVITY === transferState.failureReason) {
            return <SuspiciousActivityError onRetry={handleRetry} />
        }

        if ([FailureReason.DECRYPTION_FAILURE, FailureReason.UNKNOWN_ERROR, FailureReason.UNSUPPORTED_VERSION].includes(transferState.failureReason)) {
            return <UnexpectedError onRetry={handleRetry} />
        }
    }

    console.error("Unexpected UI state...")
    return <UnexpectedError onRetry={handleRetry} />
})