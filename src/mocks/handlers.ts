import {http, HttpResponse} from 'msw';
import data from './data.json';
import {DataItemProps} from "../models/item.ts";
import {isValidSearchField} from "../models/searchFields";

export const handlers = [
    http.get('/api/items', ({request}) => {
        const url = new URL(request.url);

        const offset = parseInt(url.searchParams.get('offset') || '0', 10);
        const limit = parseInt(url.searchParams.get('limit') || '5', 10);
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const field = url.searchParams.get('field') || 'title';

        // Validate search field or use title as default
        const searchField = isValidSearchField(field) ? field : 'title';

        // Filter items based on search field
        const filteredItems = data.items.filter((item: DataItemProps) => {
            switch (searchField) {
                case 'description':
                    return item.description.toLowerCase().includes(search);
                case 'email':
                    return item.email.toLowerCase().includes(search);
                case 'price':
                    return item.price.toString().includes(search);
                case 'title':
                default:
                    return item.title.toLowerCase().includes(search);
            }
        });

        // Apply pagination
        const paginatedItems = filteredItems.slice(offset, offset + limit);

        return HttpResponse.json({items: paginatedItems});
    }),
];
