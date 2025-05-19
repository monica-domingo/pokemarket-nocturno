import {act, renderHook} from "@testing-library/react";
import type {Mock} from 'vitest';
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {useFetchItems} from "./useFetchItems";
import {fetchItems} from "../services/fetchItems";

// Mock fetchItems service
vi.mock("../services/fetchItems", () => ({
    fetchItems: vi.fn(),
}));

// Mock useDebounce to return values instantly
vi.mock("./useDebounce.ts", () => ({
    useDebounce: vi.fn((value) => value),
}));

describe("useFetchItems", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        (fetchItems as Mock).mockReset();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should initialize with empty items and default state", () => {
        const {result} = renderHook(() => useFetchItems(""));
        expect(result.current.items).toEqual([]);
        expect(result.current.hasMore).toBe(true);
    });

    it("should fetch items on mount", async () => {
        const mockItems = [{title: "Item 1"}, {title: "Item 2"}];
        (fetchItems as Mock).mockResolvedValue({items: mockItems, hasMore: true});

        const {result} = renderHook(() => useFetchItems(""));

        // Ensure fetch is called initially
        expect(fetchItems).toHaveBeenCalledTimes(1);

        await act(async () => {
            await result.current.fetchItems(true);
        });

        expect(result.current.items).toEqual(mockItems);
        expect(result.current.hasMore).toBe(true);
    });

    it("should append new items on subsequent fetch", async () => {
        (fetchItems as Mock)
            .mockResolvedValueOnce({items: [{title: "Item 1"}], hasMore: true})
            .mockResolvedValueOnce({items: [{title: "Item 2"}], hasMore: true});

        const {result} = renderHook(() => useFetchItems(""));

        await act(async () => {
            await result.current.fetchItems(true);
        });

        await act(async () => {
            await result.current.fetchItems();
        });

        expect(result.current.items).toEqual([{title: "Item 1"}, {title: "Item 2"}]);
    });

    it("should avoid duplicate items when fetching more data", async () => {
        (fetchItems as Mock)
            .mockResolvedValueOnce({items: [{title: "Item 1"}], hasMore: true})
            .mockResolvedValueOnce({items: [{title: "Item 1"}, {title: "Item 2"}], hasMore: true});

        const {result} = renderHook(() => useFetchItems(""));

        await act(async () => {
            await result.current.fetchItems(true);
        });

        await act(async () => {
            await result.current.fetchItems();
        });

        expect(result.current.items).toEqual([{title: "Item 1"}, {title: "Item 2"}]);
    });

    it("should reset search results when search term changes", async () => {
        const initialMockItems = [{title: "Initial Item"}];
        const searchMockItems = [{title: "Search Item"}];
        const newSearchMockItems = [{title: "New Search Item"}];

        (fetchItems as Mock)
            .mockResolvedValueOnce({items: initialMockItems, hasMore: true})
            .mockResolvedValueOnce({items: searchMockItems, hasMore: true})
            .mockResolvedValueOnce({items: newSearchMockItems, hasMore: true});

        const {result, rerender} = renderHook(({search}) => useFetchItems(search), {
            initialProps: {search: ""}
        });

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.items).toEqual(initialMockItems);

        await act(async () => {
            rerender({search: "old"});
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        console.log('-->', result.current.items);

        expect(result.current.items).toEqual(searchMockItems);

        await act(async () => {
            rerender({search: "new"});
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.items).toEqual(newSearchMockItems);
        expect(fetchItems).toHaveBeenCalledTimes(3);
    });

    it("should not fetch if already fetching", async () => {
        (fetchItems as Mock).mockImplementation(() => new Promise(() => {
        })); // Simulate a pending request

        const {result} = renderHook(() => useFetchItems(""));

        await act(async () => {
            result.current.fetchItems();
        });

        await act(async () => {
            result.current.fetchItems();
        });

        expect(fetchItems).toHaveBeenCalledTimes(1);
    });

    it("should stop fetching when hasMore is false", async () => {
        (fetchItems as Mock).mockResolvedValue({items: [{title: "Item 1"}], hasMore: false});

        const {result} = renderHook(() => useFetchItems(""));

        await act(async () => {
            await result.current.fetchItems();
        });

        await act(async () => {
            await result.current.fetchItems();
        });

        // Should only fetch once due to hasMore = false
        expect(fetchItems).toHaveBeenCalledTimes(1);
    });

    it("should handle fetch abort correctly", async () => {
        const abortError = new Error("Fetch aborted");
        abortError.name = "AbortError";

        (fetchItems as Mock).mockRejectedValueOnce(abortError);

        const {result} = renderHook(() => useFetchItems(""));

        await act(async () => {
            await result.current.fetchItems();
        });

        expect(result.current.items).toEqual([]);
    });
});
