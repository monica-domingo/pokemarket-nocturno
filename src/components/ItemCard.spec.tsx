import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {ItemCard} from './ItemCard.tsx';
import '@testing-library/jest-dom';

const sampleItem = {
    title: 'Sample Item',
    description: 'This is a sample item description.',
    price: '100',
    email: 'sample@example.com',
    image: 'sample.jpg',
    id: '1'
};

describe('ItemCard Component', () => {
    const onRemoveFromFavorites = vi.fn();

    it('renders the item details correctly', () => {
        const mockAddToFavorites = vi.fn();
        render(<ItemCard
            onRemoveFromFavorites={onRemoveFromFavorites}
            item={sampleItem}
            onAddToFavorites={mockAddToFavorites}
            isFavorite={false}
        />);

        const image = screen.getByAltText(sampleItem.title);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', `/img/${sampleItem.image}`);

        expect(screen.getByText(sampleItem.title)).toBeInTheDocument();
        expect(screen.getByText(sampleItem.description)).toBeInTheDocument();
        expect(screen.getByText(`Price: $${sampleItem.price}`)).toBeInTheDocument();
        expect(screen.getByText(`Contact: ${sampleItem.email}`)).toBeInTheDocument();
    });

    it('calls onAddToFavorites when the add button is clicked', () => {
        const mockAddToFavorites = vi.fn();
        render(<ItemCard
            onRemoveFromFavorites={onRemoveFromFavorites}
            item={sampleItem}
            onAddToFavorites={mockAddToFavorites}
            isFavorite={false}
        />);

        const addButton = screen.getByRole('button', {name: /añadir/i});
        fireEvent.click(addButton);

        expect(mockAddToFavorites).toHaveBeenCalledTimes(1);
    });
});
