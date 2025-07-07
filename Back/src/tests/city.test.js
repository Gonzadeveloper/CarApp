const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/db');

const mockCity = {
    name: 'Coronel Pringles'
}

const mockCity2 = {
    name: 'Coronel Suarez'
}

describe('POST, GET, PUT, DELETE City', () => {

    let cityId1 = null;
    let cittId2 = null;

    afterAll(async () => {
        await sequelize.close()
    })
    
    it('Deberia resgistrar una ciudad', async () => {
        const response = await request(app)
        .post('/cities')
        .send(mockCity)

        expect(response.statusCode).toBe(201);
        expect(response.body.msg).tobe('Ciudad creada correctamente');
        expect(response.body.data.name).toBe(mockCity.name);

        cityId1 = response.body.data.id;
    })

    it('Deberia registrar una provincia 2', async () => {
        const response = await request(app)
        .post('/cities')
    })
})