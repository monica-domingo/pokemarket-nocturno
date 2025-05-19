import {beforeEach, describe, expect, it, vi} from 'vitest';
import {fetchItems} from './fetchItems';

describe('fetchItems', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();
        vi.spyOn(Math, 'random').mockReturnValue(0.123456789); // Mock Math.random for consistent ID generation
    });

    it('should fetch items successfully', async () => {
        const mockItems = [
            {id: '4fzzzxjylrx', name: 'Item 1'},
            {id: '4fzzzxjylrx', name: 'Item 2'},
        ];
        // Mock fetch response
        vi.spyOn(window, 'fetch').mockResolvedValue(new Response(
            JSON.stringify({items: mockItems}),
            {
                status: 200,
                headers: {'Content-type': 'application/json'}
            }
        ));

        const params = {
            search: 'test',
            offset: 0,
            limit: 2
        };

        const result = await fetchItems(params);

        // Verify fetch was called with correct parameters
        expect(fetch).toHaveBeenCalledWith(
            `/api/items?search=test&offset=0&limit=2&field=title`,
            {signal: undefined}
        );

        // Verify response structure
        expect(result).toEqual({
            items: mockItems,
            hasMore: true
        });
    });

    it('should handle empty results', async () => {
        // Mock empty response
        vi.spyOn(window, 'fetch').mockResolvedValue(new Response(
            JSON.stringify({items: []}),
            {
                status: 200,
                headers: {'Content-type': 'application/json'}
            }
        ));

        const params = {
            search: 'nonexistent',
            offset: 0,
            limit: 10
        };

        const result = await fetchItems(params);

        expect(result).toEqual({
            items: [],
            hasMore: false
        });
    });

    it('should handle network errors', async () => {
        // Mock failed response
        vi.spyOn(window, 'fetch').mockResolvedValue(new Response(
            JSON.stringify({items: null}),
            {
                status: 500,
                statusText: 'Internal Server Error',
                headers: {'Content-type': 'application/json'}
            }
        ));

        const params = {
            search: 'test',
            offset: 0,
            limit: 10
        };

        await expect(fetchItems(params)).rejects.toThrow('Network response was not ok');
    });

    it('should handle abort signal', async () => {
        const abortController = new AbortController();
        const params = {
            search: 'test',
            offset: 0,
            limit: 10,
            signal: abortController.signal
        };

        vi.spyOn(window, 'fetch').mockResolvedValue(new Response(
            JSON.stringify({items: []}),
            {
                status: 200,
                headers: {'Content-type': 'application/json'}
            }
        ));

        await fetchItems(params);

        // Verify fetch was called with abort signal
        expect(fetch).toHaveBeenCalledWith(
            `/api/items?search=test&offset=0&limit=10&field=title`,
            {signal: abortController.signal}
        );
    });
});