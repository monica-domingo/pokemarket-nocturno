import {setupServer} from 'msw/node';
import {handlers} from './handlers';

// Configuración del servidor MSW para lso tests
export const server = setupServer(...handlers);
