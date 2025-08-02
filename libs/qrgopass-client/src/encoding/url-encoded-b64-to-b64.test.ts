// Tests for converting URL-encoded Base64 to standard Base64
import { urlEncodedB64ToB64 } from './url-encoded-b64-to-b64';
import { describe, it, expect } from 'vitest';

describe('urlEncodedB64ToB64', () => {
    it('should convert URL-encoded Base64 to standard Base64', () => {
        const input = 'abc-_123';
        const expectedOutput = 'abc+/123';
        expect(urlEncodedB64ToB64(input)).toBe(expectedOutput);
    });

    it.each(['aGVsbG8', 'aGVsbG'])('should handle missing padding characters', (input) => {
        const expectedOutput = `${input}${Array.from({ length: 8 - input.length }, () => '=').join("")}`;
        expect(urlEncodedB64ToB64(input)).toBe(expectedOutput);
    });

    it.each(['aGVsbG8=', 'aGVsbG=='])('should handle valid padding characters', (input) => {
        expect(urlEncodedB64ToB64(input)).toBe(input);
    });

    it('should throw an error for invalid length strings where we cannot determine the padding', () => {
        const input = 'aGVsa';
        expect(() => urlEncodedB64ToB64(input)).toThrow('InvalidLengthError: Input base64url string is the wrong length to determine padding');
    });
});