import { describe, expect, it, vi } from 'vitest';
import { QRGoPassFailure, FailureReason } from "../../types";
import { FailureHandler } from "./failure-handler";
import { IResponseHandler } from '../i-response-handler';

const IResponseHandlerFactory = {
    returnsWhatItIsGiven: (): IResponseHandler => ({
        handleResponse: vi.fn().mockImplementation(async (response: any) => {
            return response;
        })
    })
}

describe('FailureHandler', () => {
    it(`should return the failure response if given a QRGoPassFailure
        because that's the stated purpose of the code`, () => {
        const mockFailure: QRGoPassFailure = {
            failureReason: FailureReason.UNKNOWN_ERROR,
        };

        const testObject = new FailureHandler(IResponseHandlerFactory.returnsWhatItIsGiven());

        const result = testObject.handleResponse(mockFailure)

        expect(result).resolves.toEqual(mockFailure);
    });

    it(`should call the decorated handler if given a non-failure response
        because the code should only return early if given a failure`, () => {
        const mockResponse = { some: "response" };
        const decoratedHandler = IResponseHandlerFactory.returnsWhatItIsGiven();

        const testObject = new FailureHandler(decoratedHandler);

        const result = testObject.handleResponse(mockResponse);

        expect(decoratedHandler.handleResponse).toHaveBeenCalledWith(mockResponse);
        expect(result).resolves.toEqual(mockResponse);
    });
});