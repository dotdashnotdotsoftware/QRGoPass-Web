import { FailureReason } from "../../types";
import { IResponseHandler } from "../i-response-handler";

export class ParanoiaHandler implements IResponseHandler {
    constructor(private readonly decorated: IResponseHandler, private readonly uuid: string) { }

    public async handleResponse(response: any): ReturnType<IResponseHandler["handleResponse"]> {
        if (response.UUID !== this.uuid) {
            console.warn(`Suspicious activity detected: UUID mismatch. Expected ${this.uuid}, got ${response.uuid}`);
            return { failureReason: FailureReason.SUSPICIOUS_ACTIVITY };
        }

        if (!response.Data) {
            console.warn(`Suspicious activity detected: All messages should have a Data field & the server strips it after the first read...`);
            return { failureReason: FailureReason.SUSPICIOUS_ACTIVITY };
        }

        return this.decorated.handleResponse(response);
    }
}