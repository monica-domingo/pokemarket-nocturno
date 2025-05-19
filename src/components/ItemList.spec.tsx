import {beforeEach, describe, expect, it, vi} from 'vitest';
import {act, screen, waitFor, within} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import {ItemList} from "./ItemList.tsx";
import {render} from '../test-utils/test-utils';

// Mock hooks
vi.mock('../hooks/useFetchItems', () => ({
    useFetchItems: vi.fn(() => ({
        items: [
            {
                "id": 1,
                "title": "Pikabolt",
                "description": "Pequeño roedor eléctrico con mejillas que generan electricidad y cola en forma de rayo",
                "price": "2500",
                "email": "pikabolt@pokeworld.com",
                "image": "pikabolt.png"
            },
            {
                "id": 2,
                "title": "Charmando",
                "description": "Lagarto de fuego con una llama en la punta de su cola que indica su salud",
                "price": "2800",
                "email": "charmando@pokeworld.com",
                "image": "charmando.png"
            },
        ],
        hasMore: false,
        fetchItems: vi.fn()
    }))
}));

vi.mock('../hooks/useInfiniteScroll', () => ({
    useInfiniteScroll: vi.fn(() => ({
        lastItemRef: vi.fn()
    }))
}));

describe('ItemList Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the header and search components', async () => {
        render(<ItemList/>);

        // Verify header is rendered
        expect(screen.getByText('PokéMarket Nocturno: Donde los Entrenadores Desesperados Hacen Tratos Cuestionables')).toBeInTheDocument();

        // Verify search components are rendered
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('handles search field changes correctly', async () => {
        const user = userEvent.setup();
        const {useFetchItems} = await import('../hooks/useFetchItems');

        render(<ItemList/>);

        // Get search elements
        const searchSelect = screen.getByRole('combobox');
        const searchInput = screen.getByRole('textbox');

        // Test search input
        await act(async () => {
            await user.type(searchInput, 'test');
        });

        expect(searchInput).toHaveValue('test');

        // Change search field type
        await act(async () => {
            await user.click(searchSelect);
        });

        const descriptionOption = screen.getByRole('option', {name: 'Description'});

        await act(async () => {
            await user.click(descriptionOption);
        });

        // Verify search field was changed and input was cleared
        expect(searchInput).toHaveValue('');
        expect(searchInput).toHaveAttribute('placeholder', 'Buscar por descripción...');

        expect(useFetchItems).toHaveBeenCalledWith('', 'description');
    });

    it('updates search results when typing', async () => {
        const user = userEvent.setup();
        const {useFetchItems} = await import('../hooks/useFetchItems');

        render(<ItemList/>);

        const searchInput = screen.getByRole('textbox');

        await act(async () => {
            await user.type(searchInput, 'pika');
        });

        // Verify useFetchItems was called with search term
        await waitFor(() => {
            expect(useFetchItems).toHaveBeenCalledWith('pika', 'title');
        });
    });

    it('shows all search field options', async () => {
        const user = userEvent.setup();
        render(<ItemList/>);

        const searchSelect = screen.getByRole('combobox');

        await act(async () => {
            await user.click(searchSelect);
        });

        const listbox = screen.getByRole('listbox');

        expect(within(listbox).getByRole('option', {name: 'Title'})).toBeInTheDocument();
        expect(within(listbox).getByRole('option', {name: 'Description'})).toBeInTheDocument();
        expect(within(listbox).getByRole('option', {name: 'Email'})).toBeInTheDocument();
        expect(within(listbox).getByRole('option', {name: 'Price'})).toBeInTheDocument();
    });
});
