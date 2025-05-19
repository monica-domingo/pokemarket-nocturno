import React, {memo, useCallback, useState} from "react";
import {ItemCard} from "./ItemCard";
import {Blockquote, Box, Callout, Flex, Grid, Heading, Section, Select, Text, TextField} from "@radix-ui/themes";
import {InfoCircledIcon, MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {useFetchItems} from "../hooks/useFetchItems";
import {useInfiniteScroll} from "../hooks/useInfiniteScroll";
import {SearchField} from '../models/searchFields';
import {FavoritesModal} from "./FavoritesModal.tsx";
import {useFavoritesContext} from "../contexts/FavoritesContext.tsx";

const MemoizedItemCard = memo(ItemCard);

const searchOptions: { value: SearchField; label: string }[] = [
    {value: 'title', label: 'Title'},
    {value: 'description', label: 'Description'},
    {value: 'email', label: 'Email'},
    {value: 'price', label: 'Price'}
];

const placeholdersByField: Record<SearchField, string> = {
    title: "Buscar por título...",
    description: "Buscar por descripción...",
    email: "Buscar por email...",
    price: "Buscar por precio exacto..."
};

export const ItemList = memo(() => {
    const {favorites, addToFavorites, removeFromFavorites} = useFavoritesContext();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchField, setSearchField] = useState<SearchField>('title');
    const {items, hasMore, fetchItems} = useFetchItems(searchTerm, searchField);
    const {lastItemRef} = useInfiniteScroll(fetchItems, hasMore);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    const handleSearchFieldChange = useCallback((value: string) => {
        setSearchField(value as SearchField);
        setSearchTerm(''); // Limpiar el término de búsqueda al cambiar el campo
    }, []);

    return (
        <Section>
            <Heading size="8" mb="6">PokéMarket Nocturno: Donde los Entrenadores Desesperados Hacen Tratos
                Cuestionables</Heading>
            <Text as="p" mb="4">
                ¡Bienvenido al PokéMarket Nocturno, el único lugar donde la ética entrenadora va a morir junto con tu
                billetera!
                Ubicado estratégicamente en los callejones traseros entre Ciudad Azafrán y Ciudad Carmín, nuestro
                establecimiento opera bajo el lema "No preguntes, no cuentes a la Oficial Jenny". Aquí encontrarás
                Pokémon tan raramente legales como un Magikarp útil.
            </Text>


            <Box mb="4" role="region" aria-labelledby="specialties-heading">
                <Heading size="3" mb="4" id="specialties-heading">
                    Nuestras especialidades:
                </Heading>
                <ul aria-label="Lista de especialidades del mercado negro">
                    <li>Pikachus con baterías incluidas (no garantizamos que el amarillo sea natural)</li>
                    <li>Charizards pre-evolucionados (es un Magikarp pintado de naranja, pero tú finge sorpresa)</li>
                    <li>MissingNo garantizado para duplicar tus objetos (y corromper tu partida)</li>
                    <li>Legendarios "auténticos" (definitivamente no son Dittos disfrazados que se transforman cuando
                        estornudas)
                    </li>
                    <li>Pokémon "shiny" recién pintados (la pintura se cae después de tres batallas o un baño, lo que
                        ocurra primero)
                    </li>
                </ul>
            </Box>
            <Text as="p" mb="4">
                Nuestros entrenadores proveedores utilizan las técnicas más cuestionables para obtener estos
                especímenes, desde pescar con redes electrificadas hasta hacerse pasar por el Profesor Oak en su día
                libre.
            </Text>
            <Text as="p" mb="6">
                Aceptamos pagos en PokéDólares, objetos raros y hasta intercambios con tus propios Pokémon
                (preferiblemente aquellos que no puedan testificar en tu contra).
                Recuerda: ¡Todo comprador recibe un Certificado de Autenticidad escrito a mano en una servilleta usada!
                Y si nos visitas después de medianoche, te regalamos un Electrode con temporizador incorporado. ¡Corre,
                es una oferta explosiva!
            </Text>
            <Blockquote size="1" mb="8">
                Advertencia legal en letra pequeñísima: El PokéMarket Nocturno no se responsabiliza por Pokémon que se
                nieguen a obedecerte, intenten comerte mientras duermes o resulten ser simplemente un Sr. Mime con
                problemas de identidad. No se aceptan devoluciones, reembolsos ni visitas de la Liga Pokémon.
            </Blockquote>

            <Flex width="auto" mb="8" gap="2">
                <Select.Root value={searchField} onValueChange={handleSearchFieldChange}>
                    <Select.Trigger placeholder="Selecciona el tipo de búsqueda"/>
                    <Select.Content>
                        {searchOptions.map(option => (
                            <Select.Item key={option.value} value={option.value}>
                                {option.label}
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Root>

                <TextField.Root
                    style={{"width": "100%"}}
                    type={searchField === 'price' ? 'number' : 'text'}
                    placeholder={placeholdersByField[searchField]}
                    value={searchTerm}
                    onChange={handleSearchChange}
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16"/>
                    </TextField.Slot>
                </TextField.Root>

                <FavoritesModal/>
            </Flex>

            <Grid columns={{initial: "1", sm: "2", md: "4", xl: "5"}} gap="3" width="auto" mb="6">
                {items.map((item, index) => {
                    const isFavorite = favorites.some(fav => fav.id === item.id);

                    return (
                        <div key={`Element${index}:${item.id}`}
                             ref={index === items.length - 1 ? lastItemRef : null}>
                            <MemoizedItemCard
                                item={item}
                                onAddToFavorites={() => addToFavorites(item)}
                                onRemoveFromFavorites={() => removeFromFavorites(item.id)}
                                isFavorite={isFavorite}
                            />
                        </div>
                    );
                })}
            </Grid>

            {hasMore && items.length > 0 && (
                <Text as="p" align="center" mt="4" color="gray">
                    Cargando más artículos...
                </Text>
            )}
            {!hasMore && items.length > 0 && (
                <Callout.Root>
                    <Callout.Icon>
                        <InfoCircledIcon/>
                    </Callout.Icon>
                    <Callout.Text>
                        No hay más artículos
                    </Callout.Text>
                </Callout.Root>
            )}
            {!hasMore && items.length === 0 && searchTerm && (
                <Callout.Root>
                    <Callout.Icon>
                        <InfoCircledIcon/>
                    </Callout.Icon>
                    <Callout.Text>
                        No se encontraron artículos para tu búsqueda
                    </Callout.Text>
                </Callout.Root>
            )}


        </Section>
    );
});

ItemList.displayName = 'ItemList';
