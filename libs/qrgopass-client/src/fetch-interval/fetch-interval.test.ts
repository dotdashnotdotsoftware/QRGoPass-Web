// tests of fetch-interval functionality
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchInterval } from './fetch-interval';

describe('fetchInterval', () => {
    beforeEach(() => {
        // tell vitest we use mocked time
        vi.useFakeTimers();
    });

    afterEach(() => {
        // restoring date after each test run
        vi.useRealTimers();
    });

    it.each([true, undefined])(`should call the callback function repeatedly while it explicitly returns false
        because we want to avoid bugs, we assume anything else is "done"`, async (endValue) => {
        const mockCallback = vi.fn();
        mockCallback.mockResolvedValueOnce(false)
            .mockResolvedValueOnce(false)
            .mockResolvedValueOnce(endValue);

        const fetchIntervalPromise = fetchInterval(mockCallback, 10, 1000);

        await vi.advanceTimersByTimeAsync(1000);
        expect(mockCallback).toHaveBeenCalledTimes(1);

        await vi.advanceTimersByTimeAsync(1000);
        expect(mockCallback).toHaveBeenCalledTimes(2);

        await vi.advanceTimersByTimeAsync(1000);
        expect(mockCallback).toHaveBeenCalledTimes(3);

        await vi.advanceTimersByTimeAsync(1000);
        expect(mockCallback).toHaveBeenCalledTimes(3);

        await expect(fetchIntervalPromise).resolves.toBeUndefined();
    });

    it(`should stop calling the callback after max iterations
        because it should not keep looping forever`, async () => {
        const mockCallback = vi.fn().mockResolvedValue(false);

        const fetchIntervalPromise = fetchInterval(mockCallback, 3, 1000);

        await vi.advanceTimersByTimeAsync(1000);
        expect(mockCallback).toHaveBeenCalledTimes(1);
        await vi.advanceTimersByTimeAsync(1000);
        expect(mockCallback).toHaveBeenCalledTimes(2);
        await vi.advanceTimersByTimeAsync(1000);
        expect(mockCallback).toHaveBeenCalledTimes(3);
        await vi.advanceTimersByTimeAsync(1000);
        expect(mockCallback).toHaveBeenCalledTimes(3);
        expect(fetchIntervalPromise).rejects.toBe("TOO_MANY_LOOPS");
    });
});
