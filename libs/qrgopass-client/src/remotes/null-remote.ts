import { FailureReason, QRGoPassFailure } from "../types";
import { IRemote } from "./i-remote";

export class NullRemote implements IRemote {
    public readonly timeout = 5_000

    public getResponse(): Promise<any | QRGoPassFailure> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ failureReason: FailureReason.TRANSFER_TIMEOUT });
            }, this.timeout)
        })
    }
}