import {afterAll, afterEach, beforeAll, describe, expect, it} from 'vitest';
import {ItemProps} from "../models/item.ts";
import {server} from "./server.ts";

/**
 * ✅ API `/api/items` -  Llamadas
 *
 * 📌 Obtener los primeros 5 elementos (Por defecto)
 * GET /api/items
 *
 * 📌 Obtener más elementos con paginación (offset y limit)
 * GET /api/items?offset=5&limit=5
 *
 * 📌 Búsqueda por `Title` (Por defecto)
 * GET /api/items?search=pika
 *
 * 📌 Búsqueda por `Description`
 * GET /api/items?search=apple&field=description
 *
 * 📌 Búsqueda por `Email`
 * GET /api/items?search=@example.com&field=email
 *
 * 📌 Búsqueda exacta por `Price`
 * GET /api/items?search=740&field=price
 *
 * 📌 Búsqueda combinada: Filtrar por `Title` y paginar
 * GET /api/items?search=pika&offset=10&limit=5
 *
 * 📌 Búsqueda combinada: `Description` + Paginación
 * GET /api/items?search=apple&field=description&offset=5&limit=5
 *
 * 📌 Búsqueda combinada: `Email` + Paginación
 * GET /api/items?search=@gmail.com&field=email&offset=5&limit=10
 *
 * 📌 Si el campo es inválido, usa `Title` por defecto
 * GET /api/items?search=example&field=unknownfield
 */


describe('API /api/items', () => {
    beforeAll(() => {
        console.log('🚀 Starting MSW Server');
        server.listen();
    });

    afterEach(() => {
        console.log('🔄 Resetting MSW Handlers');
        server.resetHandlers();
    });

    afterAll(() => {
        console.log('🛑 Stopping MSW Server');
        server.close();
    });
    it('debe devolver los primeros 5 elementos por defecto', async () => {
        const response = await fetch('/api/items');
        const data = await response.json();

        expect(response.ok).toBe(true);
        expect(data.items).toHaveLength(5);
    });

    it('debe devolver la cantidad especificada de elementos con limit', async () => {
        const response = await fetch('/api/items?limit=3');
        const data = await response.json();

        expect(response.ok).toBe(true);
        expect(data.items).toHaveLength(3);
    });

    it('debe devolver elementos a partir de un offset', async () => {
        const response1 = await fetch('/api/items?offset=0&limit=2');
        const data1 = await response1.json();

        const response2 = await fetch('/api/items?offset=2&limit=2');
        const data2 = await response2.json();

        expect(response1.ok).toBe(true);
        expect(response2.ok).toBe(true);

        expect(data1.items[0].title).not.toBe(data2.items[0].title);
    });

    describe('Filtrar los elementos', () => {
        it('📕 debe filtrar los elementos por `Title` (Por defecto)', async () => {
            const response = await fetch('/api/items?search=Pika');
            const data = await response.json();

            expect(response.ok).toBe(true);
            expect(data.items.length).toBeGreaterThan(0);

            data.items.forEach((item: ItemProps) => {
                expect(item.title.toLowerCase()).toContain('pika');
            });
        });

        it('📖 debe filtrar los elementos or `Description`', async () => {
            const response = await fetch('/api/items?search=Lagarto&field=description');
            const data = await response.json();

            expect(response.ok).toBe(true);
            expect(data.items.length).toBeGreaterThan(0);

            data.items.forEach((item: ItemProps) => {
                expect(item.description.toLowerCase()).toContain('lagarto');
            });
        });

        it('💰 debe filtrar los elementos por `Price`', async () => {
            const response = await fetch('/api/items?search=2800&field=price');
            const data = await response.json();

            expect(response.ok).toBe(true);
            expect(data.items.length).toBeGreaterThan(0);

            data.items.forEach((item: ItemProps) => {
                expect(item.price).toContain('2800');
            });
        });
        it('📧 debe filtrar los elementos por `Email`', async () => {
            const response = await fetch('/api/items?search=@pokemarketnocturno.dev&field=email');
            const data = await response.json();

            expect(response.ok).toBe(true);
            expect(data.items.length).toBeGreaterThan(0);

            data.items.forEach((item: ItemProps) => {
                expect(item.email.toLowerCase()).toContain('@pokemarketnocturno.dev');
            });
        });
        it('📧 debe filtrar los elementos por un campo inválido, usa `Title` por defecto', async () => {
            const response = await fetch('/api/items?search=pika&field=unknownfield');
            const data = await response.json();

            expect(response.ok).toBe(true);
            expect(data.items.length).toBeGreaterThan(0);

            data.items.forEach((item: ItemProps) => {
                expect(item.title.toLowerCase()).toContain('pika');
            });
        });
    });

    it('debe devolver una lista vacía si la búsqueda no encuentra coincidencias', async () => {
        const response = await fetch('/api/items?search=xyz123');
        const data = await response.json();

        expect(response.ok).toBe(true);
        expect(data.items).toHaveLength(0);
    });
});