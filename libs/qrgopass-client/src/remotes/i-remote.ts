import { QRGoPassFailure } from "../types";

export interface IRemote {
    getResponse(): Promise<any | QRGoPassFailure>;
}