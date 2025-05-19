import {SearchField} from "../models/searchFields.ts";
import {ItemProps} from "../models/item.ts";

export interface FetchItemsParams {
    search: string;
    offset: number;
    limit: number;
    signal?: AbortSignal;
    field?: SearchField;
}

export interface FetchItemsResponse {
    items: ItemProps[];
    hasMore: boolean;
}