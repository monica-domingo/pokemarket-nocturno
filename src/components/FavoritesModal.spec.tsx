import {fireEvent, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {FavoritesModal} from './FavoritesModal';
import {render} from '../test-utils/test-utils';
import * as FavoritesContextModule from "../contexts/FavoritesContext";

vi.mock("../contexts/FavoritesContext", {spy: true});

describe('FavoritesModal', () => {
    const mockFavorites = [
        {
            id: '1',
            title: 'Item 1',
            price: '100',
            image: 'item1.jpg',
            email: 'item1@example.com',
            description: 'Item description 1'
        },
        {
            id: '2',
            title: 'Item 2',
            price: '200',
            image: 'item2.jpg',
            email: 'item2@example.com',
            description: 'Item description 2'
        },
    ];

    const mockRemoveFromFavorites = vi.fn();
    const mockAddToFavorites = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(FavoritesContextModule, "useFavoritesContext").mockReturnValue({
            favorites: mockFavorites,
            addToFavorites: mockAddToFavorites,
            removeFromFavorites: mockRemoveFromFavorites
        });
    });

    const setup = () => {
        return render(
            <FavoritesModal/>
        );
    };

    it('renders the modal trigger button', () => {
        vi.spyOn(FavoritesContextModule, "useFavoritesContext").mockReturnValue({
            favorites: [],
            addToFavorites: mockAddToFavorites,
            removeFromFavorites: mockRemoveFromFavorites
        });
        setup();
        expect(screen.getByText('Ver Favoritos (0)')).toBeInTheDocument();
    });

    it('renders empty state message when there are no favorites', () => {
        vi.spyOn(FavoritesContextModule, "useFavoritesContext").mockReturnValue({
            favorites: [],
            addToFavorites: mockAddToFavorites,
            removeFromFavorites: mockRemoveFromFavorites
        });

        setup();
        fireEvent.click(screen.getByText('Ver Favoritos (0)'));
        expect(screen.getByText('No tienes favoritos guardados')).toBeInTheDocument();
    });

    it('displays a list of favorite items', () => {
        setup();
        fireEvent.click(screen.getByText('Ver Favoritos (2)'));
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('removes an item when clicking the remove button', () => {
        vi.spyOn(FavoritesContextModule, "useFavoritesContext").mockReturnValue({
            favorites: mockFavorites,
            addToFavorites: mockAddToFavorites,
            removeFromFavorites: mockRemoveFromFavorites
        });
        setup();
        fireEvent.click(screen.getByText('Ver Favoritos (2)'));
        const firstRemoveButton = screen.getAllByText("Remove")[0];
        fireEvent.click(firstRemoveButton);

        expect(mockRemoveFromFavorites).toHaveBeenCalled();
    });

    it('closes the modal when the Close button is clicked', () => {
        vi.spyOn(FavoritesContextModule, "useFavoritesContext").mockReturnValue({
            favorites: [],
            addToFavorites: mockAddToFavorites,
            removeFromFavorites: mockRemoveFromFavorites
        });
        setup();
        fireEvent.click(screen.getByText('Ver Favoritos (0)'));
        fireEvent.click(screen.getByText('Close'));
        expect(screen.queryByText('Favorites')).not.toBeInTheDocument();
    });
});
