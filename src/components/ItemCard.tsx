import {Box, Button, Card, Inset, Text} from '@radix-ui/themes';
import {HeartFilledIcon, HeartIcon} from "@radix-ui/react-icons";
import {ItemCardProps} from "./types.ts";

export const ItemCard = ({item, onAddToFavorites, onRemoveFromFavorites, isFavorite}: ItemCardProps) => {
    const imagePath = `/img/${item.image}`;

    const handleClick = () => {
        if (isFavorite) {
            onRemoveFromFavorites();
        } else {
            onAddToFavorites();
        }
    };

    return (
        <Box>
            <Card size="2">
                <Inset clip="padding-box" side="top" pb="current">
                    <img
                        src={imagePath}
                        alt={item.title}
                        style={{
                            position: 'relative',
                            display: "block",
                            objectFit: "cover",
                            width: "100%",
                            height: 150,
                        }}
                    />
                    <Button
                        style={{
                            position: "absolute",
                            top: '1rem',
                            left: '1rem'
                        }}
                        onClick={handleClick}
                        color={isFavorite ? "crimson" : "iris"}
                    >
                        {isFavorite ? (
                            <>
                                <HeartFilledIcon height="16" width="16"/> Eliminar
                            </>
                        ) : (
                            <>
                                <HeartIcon height="16" width="16"/> Añadir
                            </>
                        )}
                    </Button>
                </Inset>

                <Text as="p" size="4" mb="2">{item.title}</Text>
                <Text as="p" size="2" mb="4">{item.description}</Text>
                <Text as="p">Price: ${item.price}</Text>
                <Text as="p">Contact: {item.email}</Text>
            </Card>
        </Box>
    );
};
