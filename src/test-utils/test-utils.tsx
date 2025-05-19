import {render, RenderOptions} from '@testing-library/react';
import {Theme} from '@radix-ui/themes';
import React from 'react';
import {FavoritesProvider} from "../contexts/FavoritesContext.tsx";

const AllTheProviders = ({children}: { children: React.ReactNode }) => {
    return (
        <FavoritesProvider>
            <Theme accentColor="teal" grayColor="slate" panelBackground="solid" radius="full">
                {children}
            </Theme>
        </FavoritesProvider>

    );
};

const customRender = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react';

// override render method
export {customRender as render};