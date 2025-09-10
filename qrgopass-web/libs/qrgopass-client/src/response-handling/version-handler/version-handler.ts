import { FailureReason } from "../../types";
import { IResponseHandler } from "../i-response-handler";

export class VersionHandler implements IResponseHandler {
    constructor(private readonly handlers: Record<number, IResponseHandler>) { }

    public async handleResponse(response: any): ReturnType<IResponseHandler["handleResponse"]> {
        const handler = this.handlers[Number(response.V)];

        if (!handler) {
            return { failureReason: FailureReason.UNSUPPORTED_VERSION };
        }

        return handler.handleResponse(response)
    }
}