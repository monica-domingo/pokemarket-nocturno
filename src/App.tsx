import "@radix-ui/themes/styles.css";
import {Box, Card, Container, Inset, Theme} from "@radix-ui/themes";
import {ItemList} from "./components/ItemList";
import {FavoritesProvider} from "./contexts/FavoritesContext";
import {Header} from "./components/Header.tsx";

function App() {
    return (
        <FavoritesProvider>
            <Theme appearance="dark" accentColor="iris" grayColor="mauve" radius="full">
                <Header/>
                <Box position="fixed" bottom="2" right="2" style={{
                    zIndex: "300",
                }}
                >

                    <Card>
                        <Inset>
                            <img
                                src="pokemarket.png"
                                alt="Bold typography"
                                style={{
                                    display: "block",
                                    objectFit: "cover",
                                    width: "100%",
                                    height: 200,
                                }}
                            />
                        </Inset>
                    </Card>


                </Box>
                <Container>
                    <ItemList/>
                </Container>

            </Theme>
        </FavoritesProvider>
    );
}

export default App;
