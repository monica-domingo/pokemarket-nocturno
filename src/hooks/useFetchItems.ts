import {useCallback, useEffect, useRef, useState} from "react";
import {ItemProps} from "../models/item";
import {useDebounce} from "./useDebounce";
import {useAbortController} from "./useAbortController";
import {fetchItems} from "../services/fetchItems.ts";
import {SearchField} from "../models/searchFields";

const ITEMS_LIMIT = 5;
const DEBOUNCE_DELAY = 500;

export const useFetchItems = (searchTerm: string, searchField: SearchField = 'title') => {
    const [items, setItems] = useState<ItemProps[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
    const {getNewController, currentController} = useAbortController();
    const lastSearchRef = useRef<string>(debouncedSearchTerm);

    const resetSearch = useCallback(() => {
        setPage(0);
        setHasMore(true);
        setIsFetching(false);
    }, []);

    const updateItems = useCallback((newItems: ItemProps[], isNewSearch: boolean) => {
        setItems(prevItems => {
            if (isNewSearch) return newItems;

            // Avoid duplicates by checking if new items already exist
            const filteredNewItems = newItems.filter((newItem: ItemProps) =>
                !prevItems.some(existingItem => existingItem.title === newItem.title)
            );
            return [...prevItems, ...filteredNewItems];
        });
    }, []);

    const getItems = useCallback(async (isNewSearch = false) => {
        if (isFetching || (!hasMore && !isNewSearch)) return;

        const currentPage = isNewSearch ? 0 : page;
        const controller = getNewController();
        setIsFetching(true);

        try {
            const response = await fetchItems({
                search: debouncedSearchTerm,
                offset: currentPage * ITEMS_LIMIT,
                limit: ITEMS_LIMIT,
                signal: controller.signal,
                field: searchField
            });

            updateItems(response.items, isNewSearch);
            setHasMore(response.hasMore);
            setPage(currentPage + 1);

        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                console.log('Fetch aborted');
                return;
            }
            console.error('Error fetching items:', error);
        } finally {
            if (currentController.current === controller) {
                setIsFetching(false);
                currentController.current = null;
            }
        }
    }, [isFetching, hasMore, page, debouncedSearchTerm, getNewController, updateItems, searchField]);

    useEffect(() => {
        getItems(true);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (lastSearchRef.current === debouncedSearchTerm) {
            return;
        }

        lastSearchRef.current = debouncedSearchTerm;
        resetSearch();
        getItems(true);
    }, [debouncedSearchTerm, resetSearch, getItems]);

    return {items, hasMore, fetchItems: getItems};
};
