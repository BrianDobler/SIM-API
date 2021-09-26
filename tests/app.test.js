const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);

describe('general test', () => {

    it('return pong to ping', async () => {
        const response = await api.get('/ping');
        expect(response.body).toContain('Pong');
    });
});

describe('distributions', () => {
    
    it('return a normal distribution array', async () => {
    });

    it('return an exponential distribution array', () => {
    });

    it('return an uniform distribution array', () => {
    });

});