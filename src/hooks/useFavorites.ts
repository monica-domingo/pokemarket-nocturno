import {useState} from "react";
import {ItemProps} from "../models/item";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<ItemProps[]>([]);

    const addToFavorites = (item: ItemProps) => {
        if (!favorites.some((fav) => fav.id === item.id)) {
            setFavorites((prev) => [...prev, item]);
        }
    };

    const removeFromFavorites = (id: string) => {
        setFavorites((prev) => prev.filter((item) => item.id !== id));
    };

    return {
        favorites,
        addToFavorites,
        removeFromFavorites,
    };
};
