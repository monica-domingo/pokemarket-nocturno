import {Avatar, Box, Button, Card, Flex, Text} from "@radix-ui/themes";
import {CardCompactProps} from "./types.ts";

export const CardCompact = ({id, title, price, image, onRemove}: CardCompactProps) => {
    const imagePath = `/img/${image}`;

    return (
        <Card>
            <Flex gap="4" align="center" justify="between">
                <Flex gap="3" align="center">
                    <Avatar
                        size="4"
                        style={{
                            height: 112,
                        }} src={imagePath}
                        alt={title}
                        radius="small"
                        fallback={title}
                    />
                    <Box>
                        <Text as="div" size="2" weight="bold">
                            {title}
                        </Text>
                        <Text as="div" size="2" color="gray">
                            Precio: ${price}
                        </Text>
                    </Box>
                </Flex>
                <Button
                    color="red"
                    variant="soft"
                    onClick={() => onRemove(id)}
                >
                    Remove
                </Button>
            </Flex>
        </Card>
    );
}; 