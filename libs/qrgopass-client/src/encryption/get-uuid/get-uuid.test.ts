import { describe, expect, it } from 'vitest';
import { getUuid } from './get-uuid';

describe('getUuid', () => {
    it(`should return a valid UUID
        because that's the stated purpose of the code`, () => {
        const uuid = getUuid();
        expect(uuid).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        );
    });

    it(`should return different UUIDs on multiple calls
        because otherwise they would not be "unique"!`, () => {
        const uuid1 = getUuid();
        const uuid2 = getUuid();
        expect(uuid1).not.toBe(uuid2);
    });

    it(`should use crypto.randomUUID if available
        because that's the most reliable way to generate UUIDs in modern browsers`, () => {
        const originalCryptoRandomUUID = globalThis.crypto.randomUUID;
        try {
            const mockedUUID = '12345678-1234-5678-1234-567812345678';
            (globalThis as any).crypto.randomUUID = () => mockedUUID;
            const result = getUuid();
            expect(result).toBe(mockedUUID);
        } finally {
            (globalThis as any).crypto.randomUUID = originalCryptoRandomUUID;
        }
    });

    it(`should fallback to a custom UUID generation method if crypto.randomUUID is not available
        because not all environments support crypto.randomUUID`, () => {
        const originalCryptoRandomUUID = globalThis.crypto.randomUUID;
        try {
            (globalThis as any).crypto.randomUUID = undefined;
            const result = getUuid();
            expect(result).toMatch(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
            );
        } finally {
            (globalThis as any).crypto.randomUUID = originalCryptoRandomUUID;
        }
    });
});