import { component$, Signal } from "@builder.io/qwik";
import { TransferStage } from "./transfer-stage";
import { CredentialsRXContainer } from "../credentials-received";

export const LandingQr = component$(({ credentials }: { credentials: Signal<CredentialsRXContainer | null> }) => {
    return <TransferStage credentials={credentials} />
})