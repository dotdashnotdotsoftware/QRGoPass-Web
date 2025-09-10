import { UserCredentials, QRGoPassFailure, FailureReason, isQRGoPassFailure } from "./types";
import { EncryptionServices } from "./encryption/encryption-services";
import { IRemote } from "./remotes/i-remote";
import { AwsRemote } from "./remotes/aws";
import { CREDENTIAL_TRANSFER, UserCredentialsHandler } from "./response-handling/user-credentials-handler";
import { IResponseHandler } from "./response-handling/i-response-handler";
import { FailureHandler } from "./response-handling/failure-handler";
import { ExceptionHandler } from "./response-handling/exception-handler";
import { VersionHandler } from "./response-handling/version-handler";
import { ParanoiaHandler } from "./response-handling/paranoia-handler/paranoia-handler";
import { BACKUP_KEY_TRANSFER, BackupKeyHandler } from "./response-handling/backup-key-transfer";

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
    get timeout() {
        return this.remote.timeout;
    }

    constructor(
        encryptionServices: EncryptionServices,
        readonly uuid: string,
        readonly base64EncodedPublicKey: string,
        private readonly remote: IRemote
    ) {
        this.responseHandler = new ExceptionHandler(
            new FailureHandler(
                new ParanoiaHandler(
                    new VersionHandler({
                        [CREDENTIAL_TRANSFER]: new UserCredentialsHandler(encryptionServices),
                        [BACKUP_KEY_TRANSFER]: new BackupKeyHandler(encryptionServices)
                    }),
                    uuid
                ),
            )
        );
    }

    public async getCredentials(): ReturnType<IResponseHandler["handleResponse"]> {
        const remoteResponse = await this.remote.getResponse();
        return this.responseHandler.handleResponse(remoteResponse);
    }
}
