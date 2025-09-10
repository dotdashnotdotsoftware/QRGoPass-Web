import { describe, expect, it, vi } from 'vitest';
import { FailureReason } from "../../types";
import { ParanoiaHandler } from "./paranoia-handler";
import { IResponseHandler } from '../i-response-handler';

const IResponseHandlerFactory = {
    returnsWhatItIsGiven: (): IResponseHandler => ({
        handleResponse: vi.fn().mockImplementation(async (response: any) => {
            return response;
        })
    })
}

const arbitraryUuid = "123e4567-e89b-12d3-a456-426614174000";
const arbitraryData = { some: "data" };

describe('ParanoiaHandler', () => {
    it(`should return suspicious activity if the Data property has no value
        because the backend only allows the transferred data to be read once
        and if the data was already read by someone else, we've got good reason to worry...`, () => {
        const mockResponse = { V: "1", UUID: arbitraryUuid, Data: null };

        const testObject = new ParanoiaHandler(IResponseHandlerFactory.returnsWhatItIsGiven(), arbitraryUuid);

        const result = testObject.handleResponse(mockResponse)

        expect(result).resolves.toEqual({ failureReason: FailureReason.SUSPICIOUS_ACTIVITY });
    });

    it(`should return suspicious activity if the UUID is missing
        because the UUID is a unique identifier and should not have been tampered with
        this isn't really any more secure, but, "ParanoiaHandler"`, () => {
        const mockResponse = { V: "1", Data: arbitraryData };

        const testObject = new ParanoiaHandler(IResponseHandlerFactory.returnsWhatItIsGiven(), arbitraryUuid);

        const result = testObject.handleResponse(mockResponse)

        expect(result).resolves.toEqual({ failureReason: FailureReason.SUSPICIOUS_ACTIVITY });
    });

    it(`should return suspicious activity if the UUID does not match the expected one
        because the UUID is a unique identifier and should not have been tampered with
        this isn't really any more secure, but, "ParanoiaHandler"`, () => {
        const mockResponse = { V: "1", UUID: "something-else", Data: arbitraryData };

        const testObject = new ParanoiaHandler(IResponseHandlerFactory.returnsWhatItIsGiven(), arbitraryUuid);

        const result = testObject.handleResponse(mockResponse)

        expect(result).resolves.toEqual({ failureReason: FailureReason.SUSPICIOUS_ACTIVITY });
    });

    it(`should call the decorated handler if given a response in the right basic format
        because the code should only try to protect against malformed data`, () => {
        const mockResponse = { V: "1", UUID: arbitraryUuid, Data: arbitraryData };
        const decoratedHandler = IResponseHandlerFactory.returnsWhatItIsGiven();

        const testObject = new ParanoiaHandler(decoratedHandler, arbitraryUuid);

        const result = testObject.handleResponse(mockResponse);

        expect(decoratedHandler.handleResponse).toHaveBeenCalledWith(mockResponse);
        expect(result).resolves.toEqual(mockResponse);
    });
});