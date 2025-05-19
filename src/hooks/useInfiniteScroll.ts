import {useCallback, useEffect, useRef} from "react";

export const useInfiniteScroll = (fetchItems: () => void, hasMore: boolean) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const observerOptions = useRef({
        root: null,
        rootMargin: '20px',
        threshold: 0.1
    });

    // Create observer instance only once
    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                fetchItems();
            }
        }, observerOptions.current);

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [fetchItems, hasMore]);

    const lastItemRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (!hasMore || !fetchItems) return;

            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    fetchItems();
                }
            });

            if (node) observer.current.observe(node);
        },
        [fetchItems, hasMore]
    );

    return {lastItemRef};
};
