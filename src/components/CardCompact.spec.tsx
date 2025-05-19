import {fireEvent, render, screen} from '@testing-library/react';
import {CardCompact} from './CardCompact';

describe('CardCompact', () => {
    const mockProps = {
        id: "1",
        title: "Test Item",
        price: "99.99",
        image: "test.jpg",
        onRemove: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders card with correct information', () => {
        render(
            <>
                <CardCompact {...mockProps} />
            </>
        );

        expect(screen.getByText('Test Item')).toBeInTheDocument();
        expect(screen.getByText('Precio: $99.99')).toBeInTheDocument();
    });

    it('calls onRemove with correct id when remove button is clicked', () => {
        render(
            <>
                <CardCompact {...mockProps} />
            </>
        );

        fireEvent.click(screen.getByRole('button', {name: 'Remove'}));
        expect(mockProps.onRemove).toHaveBeenCalledWith("1");
    });

    it('renders price with correct format', () => {
        render(
            <>
                <CardCompact {...mockProps} />
            </>
        );

        expect(screen.getByText(`Precio: $${mockProps.price}`)).toBeInTheDocument();
    });
}); 