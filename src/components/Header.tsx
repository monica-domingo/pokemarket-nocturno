import {Flex, Heading, Section, Separator, Text} from "@radix-ui/themes";

export const Header = () => {
    return (
        <Section py="5">
            <Flex gap="4" pb="2" align="center" justify="between">
                <Heading color="iris">PokéMarket Nocturno</Heading>
                <Text color="iris">Donde los Entrenadores Desesperados Hacen Tratos Cuestionables</Text>
            </Flex>
            <Separator my="3" size="4"/>
        </Section>
    );
}