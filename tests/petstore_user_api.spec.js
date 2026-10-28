const { test, expect } = require('@playwright/test');

const baseURL = 'https://petstore.swagger.io/v2';

const userId = Date.now();
const username = `flavia${userId}`;

test.describe.serial('PetStore - User API', () => {

    test('POST - Criar usuário', async ({ request }) => {

        const response = await request.post(`${baseURL}/user`, {
            data: {
                id: userId,
                username: username,
                firstName: 'Flavia',
                lastName: 'Carvalho',
                email: 'flavia@teste.com',
                password: '123456',
                phone: '34999999999',
                userStatus: 1
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.code).toBe(200);
    });

    test('GET - Consultar usuário', async ({ request }) => {

        const response = await request.get(`${baseURL}/user/${username}`);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.username).toBe(username);
        expect(body.firstName).toBe('Flavia');
        expect(body.lastName).toBe('Carvalho');
        expect(body.email).toBe('flavia@teste.com');

    });

    test('PUT - Alterar usuário', async ({ request }) => {

        const response = await request.put(`${baseURL}/user/${username}`, {
            data: {
                id: userId,
                username: username,
                firstName: 'Flavia',
                lastName: 'Carvalho',
                email: 'flavia.alterada@teste.com',
                password: '654321',
                phone: '34988888888',
                userStatus: 1
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.code).toBe(200);

    });

    test('GET - Confirmar alteração do usuário', async ({ request }) => {

        const response = await request.get(`${baseURL}/user/${username}`);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.email).toBe('flavia.alterada@teste.com');
        expect(body.password).toBe('654321');
        expect(body.phone).toBe('34988888888');

    });

    test('DELETE - Excluir usuário', async ({ request }) => {

        const response = await request.delete(`${baseURL}/user/${username}`);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.code).toBe(200);
        expect(body.message).toBe(username);

    });

    test('GET - Confirmar exclusão do usuário', async ({ request }) => {

        const response = await request.get(`${baseURL}/user/${username}`);

        expect(response.status()).toBe(404);

    });

});