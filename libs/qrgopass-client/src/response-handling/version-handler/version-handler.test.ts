import { describe, expect, it, vi } from 'vitest';
import { FailureReason } from "../../types";
import { VersionHandler } from "./version-handler";
import { IResponseHandler } from '../i-response-handler';

const IResponseHandlerFactory = {
    returnsWhatItIsGiven: (): IResponseHandler => ({
        handleResponse: vi.fn().mockImplementation(async (response: any) => {
            return response;
        })
    })
}

describe('VersionHandler', () => {
    it(`should call the mapped handler if it exists
        because the role of this code is to map codes to handlers`, () => {
        const mockResponse = { V: 1, some: "response" };
        const decoratedHandler = IResponseHandlerFactory.returnsWhatItIsGiven();

        const testObject = new VersionHandler({
            1: decoratedHandler
        });

        const result = testObject.handleResponse(mockResponse)

        expect(result).resolves.toEqual(mockResponse);
    });

    it(`should return a failure if the version is not in the map
        because we should report errors when the mapping is unknown`, () => {
        const mockResponse = { V: 1, some: "response" };

        const testObject = new VersionHandler({});

        const result = testObject.handleResponse(mockResponse)

        expect(result).resolves.toEqual({
            failureReason: FailureReason.UNSUPPORTED_VERSION
        });
    });
});