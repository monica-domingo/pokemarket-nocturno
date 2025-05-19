import {createContext, ReactNode, useContext} from "react";
import {useFavorites} from "../hooks/useFavorites";
import {ItemProps} from "../models/item";

interface FavoritesContextProps {
    favorites: ItemProps[];
    addToFavorites: (item: ItemProps) => void;
    removeFromFavorites: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider = ({children}: { children: ReactNode }) => {
    const {favorites, addToFavorites, removeFromFavorites} = useFavorites();

    return (
        <FavoritesContext.Provider value={{favorites, addToFavorites, removeFromFavorites}}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavoritesContext = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavoritesContext must be used within a FavoritesProvider");
    }
    return context;
};
