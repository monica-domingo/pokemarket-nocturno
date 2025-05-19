import {isValidSearchField} from "../models/searchFields";
import {FetchItemsParams, FetchItemsResponse} from "./types.ts";

export const fetchItems = async ({
    search,
    offset,
    limit,
    signal,
    field = 'title'
}: FetchItemsParams): Promise<FetchItemsResponse> => {
    // Validate search field
    const searchField = isValidSearchField(field) ? field : 'title';

    const queryParams = new URLSearchParams({
        search,
        offset: offset.toString(),
        limit: limit.toString(),
        field: searchField
    });

    const response = await fetch(
        `/api/items?${queryParams.toString()}`,
        {signal}
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return {
        items: data.items.map((item: Record<string, unknown>) => ({
            ...item,
            id: Math.random().toString(36).substring(2, 15)
        })),
        hasMore: data.items.length === limit
    };
}; 