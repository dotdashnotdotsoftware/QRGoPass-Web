import { UserCredentials, QRGoPassFailure, FailureReason, isQRGoPassFailure } from "./types";
import { EncryptionServices } from "./encryption/encryption-services";
import { IRemote } from "./remotes/i-remote";
import { AwsRemote } from "./remotes/aws";
import { UserCredentialsHandler } from "./response-handling/user-credentials-handler";
import { IResponseHandler } from "./response-handling/i-response-handler";
import { FailureHandler } from "./response-handling/failure-handler";
import { ExceptionHandler } from "./response-handling/exception-handler/exception-handler";

export async function initialise(): Promise<QRGoPassSession> {
    const encryptionServices = await EncryptionServices.createAsync();
    const base64EncodedPublicKey = await encryptionServices.getPublicModulus();
    const uuid = encryptionServices.getUuid();

    return new QRGoPassSession(
        encryptionServices,
        uuid,
        base64EncodedPublicKey,
        new AwsRemote(uuid)
    );
}

export class QRGoPassSession {
    private readonly responseHandler: IResponseHandler;

    constructor(
        encryptionServices: EncryptionServices,
        readonly uuid: string,
        readonly base64EncodedPublicKey: string,
        private readonly remote: IRemote
    ) {
        this.responseHandler = new ExceptionHandler(
            new FailureHandler(
                new UserCredentialsHandler(encryptionServices)
            )
        );
    }

    public async getCredentials(): Promise<UserCredentials | QRGoPassFailure> {
        const remoteResponse = await this.remote.getResponse();
        return this.responseHandler.handleResponse(remoteResponse);
    }
}
