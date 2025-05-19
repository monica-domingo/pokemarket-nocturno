import {act, renderHook} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {useAbortController} from './useAbortController';

describe('useAbortController', () => {
    it('should initialize without an active controller', () => {
        const {result} = renderHook(() => useAbortController());
        expect(result.current.currentController.current).toBeNull();
    });

    it('should create a new AbortController when getNewController is called', () => {
        const {result} = renderHook(() => useAbortController());

        act(() => {
            const controller = result.current.getNewController();
            expect(controller).toBeInstanceOf(AbortController);
            expect(result.current.currentController.current).toBe(controller);
        });
    });

    it('should abort previous request when calling getNewController', () => {
        const {result} = renderHook(() => useAbortController());

        act(() => {
            const controller1 = result.current.getNewController();
            vi.spyOn(controller1, 'abort');

            const controller2 = result.current.getNewController();

            expect(controller1.abort).toHaveBeenCalled();
            expect(result.current.currentController.current).toBe(controller2);
        });
    });

    it('should abort previous request when calling abortPreviousRequest', () => {
        const {result} = renderHook(() => useAbortController());

        act(() => {
            const controller = result.current.getNewController();
            vi.spyOn(controller, 'abort');
            result.current.abortPreviousRequest();
            expect(controller.abort).toHaveBeenCalled();
            expect(result.current.currentController.current).toBeNull();
        });
    });
});
