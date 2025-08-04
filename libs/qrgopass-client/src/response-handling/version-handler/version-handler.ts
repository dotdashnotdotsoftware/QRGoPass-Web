import { UserCredentials, QRGoPassFailure, FailureReason } from "../../types";
import { IResponseHandler } from "../i-response-handler";

export class VersionHandler implements IResponseHandler {
    constructor(private readonly handlers: Record<number, IResponseHandler>) { }

    public async handleResponse(response: any): Promise<UserCredentials | QRGoPassFailure> {
        const handler = this.handlers[response.V];

        if (!handler) {
            console.log("Unsuppored right now");
            return { failureReason: FailureReason.UNSUPPORTED_VERSION };
        }

        return handler.handleResponse(response)
    }
}