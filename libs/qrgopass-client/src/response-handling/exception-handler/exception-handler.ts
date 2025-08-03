import { UserCredentials, QRGoPassFailure, FailureReason } from "../../types";
import { IResponseHandler } from "../i-response-handler";

export class ExceptionHandler implements IResponseHandler {
    constructor(private readonly decorated: IResponseHandler) { }

    public async handleResponse(response: any): Promise<UserCredentials | QRGoPassFailure> {
        try {
            return await this.decorated.handleResponse(response);
        } catch (e) {
            console.error("Error processing remote response", e);
            return { failureReason: FailureReason.UNKNOWN_ERROR };
        }
    }
}