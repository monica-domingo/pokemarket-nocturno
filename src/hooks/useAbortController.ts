import {useRef} from 'react';

export const useAbortController = () => {
    const controllerRef = useRef<AbortController | null>(null);

    const abortPreviousRequest = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
            controllerRef.current = null;
        }
    };

    const getNewController = () => {
        abortPreviousRequest();
        const controller = new AbortController();
        controllerRef.current = controller;
        return controller;
    };

    return {
        abortPreviousRequest,
        getNewController,
        currentController: controllerRef
    };
};
