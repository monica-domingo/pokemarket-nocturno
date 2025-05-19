import {act, renderHook} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {useDebounce} from './useDebounce';

describe('useDebounce', () => {
    it('should return the initial value immediately', () => {
        const {result} = renderHook(() => useDebounce('test', 500));
        expect(result.current).toBe('test');
    });

    it('should update value after the specified delay', async () => {
        vi.useFakeTimers();
        const {result, rerender} = renderHook(({value}) => useDebounce(value, 500), {
            initialProps: {value: 'initial'},
        });

        expect(result.current).toBe('initial');

        rerender({value: 'updated'});

        // Value should not change immediately
        expect(result.current).toBe('initial');

        // Fast-forward time
        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(result.current).toBe('updated');

        vi.useRealTimers();
    });

    it('should reset debounce timer on rapid value changes', async () => {
        vi.useFakeTimers();
        const {result, rerender} = renderHook(({value}) => useDebounce(value, 500), {
            initialProps: {value: 'initial'},
        });

        rerender({value: 'change1'});
        act(() => {
            vi.advanceTimersByTime(200);
        });

        rerender({value: 'change2'});
        act(() => {
            vi.advanceTimersByTime(200);
        });

        // The value should not have updated yet
        expect(result.current).toBe('initial');

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(result.current).toBe('change2');

        vi.useRealTimers();
    });
});
