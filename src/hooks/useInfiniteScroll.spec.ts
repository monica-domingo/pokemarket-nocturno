import {renderHook} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {useInfiniteScroll} from './useInfiniteScroll';

describe('useInfiniteScroll', () => {
    let mockIntersectionObserver: ReturnType<typeof vi.fn>;
    let observeCallback: (entries: IntersectionObserverEntry[]) => void;
    let disconnectMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        disconnectMock = vi.fn();
        mockIntersectionObserver = vi.fn((callback) => {
            observeCallback = callback;
            return {
                observe: vi.fn(),
                disconnect: disconnectMock,
            };
        });

        // Mock the IntersectionObserver
        vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.clearAllMocks();
    });

    it('should create an IntersectionObserver with correct options', () => {
        const fetchItems = vi.fn();
        renderHook(() => useInfiniteScroll(fetchItems, true));

        expect(mockIntersectionObserver).toHaveBeenCalledWith(
            expect.any(Function),
            {
                root: null,
                rootMargin: '20px',
                threshold: 0.1
            }
        );
    });

    it('should call fetchItems when intersection is detected and hasMore is true', () => {
        const fetchItems = vi.fn();
        renderHook(() => useInfiniteScroll(fetchItems, true));

        // Simulate intersection
        observeCallback([{isIntersecting: true} as IntersectionObserverEntry]);

        expect(fetchItems).toHaveBeenCalled();
    });

    it('should not call fetchItems when intersection is detected but hasMore is false', () => {
        const fetchItems = vi.fn();
        renderHook(() => useInfiniteScroll(fetchItems, false));

        // Simulate intersection
        observeCallback([{isIntersecting: true} as IntersectionObserverEntry]);

        expect(fetchItems).not.toHaveBeenCalled();
    });

    it('should not call fetchItems when no intersection is detected', () => {
        const fetchItems = vi.fn();
        renderHook(() => useInfiniteScroll(fetchItems, true));

        // Simulate no intersection
        observeCallback([{isIntersecting: false} as IntersectionObserverEntry]);

        expect(fetchItems).not.toHaveBeenCalled();
    });

    it('should disconnect observer when component unmounts', () => {
        const fetchItems = vi.fn();
        const {unmount} = renderHook(() => useInfiniteScroll(fetchItems, true));

        unmount();

        expect(disconnectMock).toHaveBeenCalled();
    });

    it('should return lastItemRef function', () => {
        const fetchItems = vi.fn();
        const {result} = renderHook(() => useInfiniteScroll(fetchItems, true));

        expect(result.current.lastItemRef).toBeInstanceOf(Function);
    });
});
