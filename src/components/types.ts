import {ItemProps} from "../models/item.ts";

export interface ItemCardProps {
    item: ItemProps;
    onAddToFavorites: () => void;
    onRemoveFromFavorites: () => void;
    isFavorite: boolean;
}

export interface CardCompactProps {
    id: string;
    title: string;
    price: string;
    image: string;
    onRemove: (id: string) => void;
}