import { describe, expect, it, vi } from 'vitest';
import { FailureReason } from "../../types";
import { ExceptionHandler } from "./exception-handler";
import { IResponseHandler } from '../i-response-handler';

const IResponseHandlerFactory = {
    returnsWhatItIsGiven: (): IResponseHandler => ({
        handleResponse: vi.fn().mockImplementation(async (response: any) => {
            return response;
        })
    }),

    throwsAnException: (): IResponseHandler => ({
        handleResponse: vi.fn().mockRejectedValue(new Error("Simulated error"))
    })
}

describe('ExceptionHandler', () => {
    it(`should return unknown error when the decorated handler throws
        because it should gracefully handle exceptional cases anywhere in the stack`, () => {
        const testObject = new ExceptionHandler(IResponseHandlerFactory.throwsAnException());
        const result = testObject.handleResponse({ some: "response" });
        expect(result).resolves.toEqual({ failureReason: FailureReason.UNKNOWN_ERROR });
    });

    it(`should call the decorated handler and return what it returns
        because as long as it does not throw an exception, we do nothing else`, () => {
        const mockResponse = { some: "response" };
        const decoratedHandler = IResponseHandlerFactory.returnsWhatItIsGiven();

        const testObject = new ExceptionHandler(decoratedHandler);

        const result = testObject.handleResponse(mockResponse);

        expect(decoratedHandler.handleResponse).toHaveBeenCalledWith(mockResponse);
        expect(result).resolves.toEqual(mockResponse);
    });
});