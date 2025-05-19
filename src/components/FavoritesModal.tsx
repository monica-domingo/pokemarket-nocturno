import {Box, Button, Dialog, Flex, Text} from "@radix-ui/themes";
import {CardCompact} from "./CardCompact";
import {useFavoritesContext} from "../contexts/FavoritesContext.tsx";

export const FavoritesModal = () => {
    const {favorites, removeFromFavorites} = useFavoritesContext();

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>
                    Ver Favoritos ({favorites.length})
                </Button>
            </Dialog.Trigger>

            <Dialog.Content style={{maxWidth: 450}}>
                <Dialog.Title>Favorites</Dialog.Title>

                {favorites.length === 0 ? (
                    <Flex align="center" justify="center" py="4">
                        <Text size="2">No tienes favoritos guardados</Text>
                    </Flex>
                ) : (
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        overflowY: 'auto'
                    }}>
                        {favorites.map((item) => (
                            <li key={item.title} style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px',
                                gap: '12px',
                                borderBottom: '1px solid var(--gray-4)'
                            }}>
                                <Box width="100%">
                                    <CardCompact
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        image={item.image}
                                        onRemove={removeFromFavorites}
                                    />
                                </Box>
                            </li>
                        ))}
                    </ul>
                )}

                <Flex justify="end" mt="4">
                    <Dialog.Close>
                        <Button>Close</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
