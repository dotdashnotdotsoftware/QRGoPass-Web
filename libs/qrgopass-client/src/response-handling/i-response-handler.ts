import { QRGoPassFailure, UserCredentials } from "../types";

export interface IResponseHandler {
    handleResponse(response: any): Promise<UserCredentials | QRGoPassFailure>;
}
