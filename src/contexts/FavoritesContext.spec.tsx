import {act, render} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {FavoritesProvider, useFavoritesContext} from "./FavoritesContext";
import {ItemProps} from "../models/item";

describe("FavoritesContext", () => {
    const mockItem: ItemProps = {
        id: "1",
        title: "Test Item",
        price: "100",
        image: "test.jpg",
        email: "test1@email.com",
        description: "Test Description",
    };

    it("throws an error if used outside of provider", () => {
        const TestComponent = () => {
            useFavoritesContext();
            return null;
        };

        expect(() => render(<TestComponent/>)).toThrow(
            "useFavoritesContext must be used within a FavoritesProvider"
        );
    });

    it("provides default favorites and functions", () => {
        let contextValue: any;

        const TestComponent = () => {
            contextValue = useFavoritesContext();
            return null;
        };

        render(
            <FavoritesProvider>
                <TestComponent/>
            </FavoritesProvider>
        );

        expect(contextValue.favorites).toEqual([]);
        expect(typeof contextValue.addToFavorites).toBe("function");
        expect(typeof contextValue.removeFromFavorites).toBe("function");
    });

    it("adds an item to favorites", () => {
        let contextValue: any;

        const TestComponent = () => {
            contextValue = useFavoritesContext();
            return null;
        };

        render(
            <FavoritesProvider>
                <TestComponent/>
            </FavoritesProvider>
        );

        act(() => {
            contextValue.addToFavorites(mockItem);
        });

        expect(contextValue.favorites).toContainEqual(mockItem);
    });

    it("removes an item from favorites", () => {
        let contextValue: any;

        const TestComponent = () => {
            contextValue = useFavoritesContext();
            return null;
        };

        render(
            <FavoritesProvider>
                <TestComponent/>
            </FavoritesProvider>
        );

        act(() => {
            contextValue.addToFavorites(mockItem);
        });
        expect(contextValue.favorites).toContainEqual(mockItem);

        act(() => {
            contextValue.removeFromFavorites(mockItem.id);
        });

        expect(contextValue.favorites).not.toContainEqual(mockItem);
    });
});
