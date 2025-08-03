import { UserCredentials, QRGoPassFailure, isQRGoPassFailure } from "../../types";
import { IResponseHandler } from "../i-response-handler";

export class FailureHandler implements IResponseHandler {
    constructor(private readonly decorated: IResponseHandler) { }

    public async handleResponse(response: any): Promise<UserCredentials | QRGoPassFailure> {
        if (isQRGoPassFailure(response)) {
            return response;
        }

        return this.decorated.handleResponse(response);
    }
}