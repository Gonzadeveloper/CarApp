const request =  require('supertest');
const app = require('../app')
const sequelize = require('../config/db')

const mockProvince = {
    name: "Cordoba"
}

const mockProvince2 = {
    name: "Neuquen"
}

describe('POST, GET, PUT, DELETE Province', ()=> {
    let provinceID1 = null;
    let provinceID2 = null;


    afterAll(async ()=> {
        await sequelize.close();
    });

    it('Deberia registrar una provincia', async () => {
        const response = await request(app)
        .post('/provinces')
        .send(mockProvince)

        expect(response.statusCode).toBe(201);
        expect(response.body.msg).toBe('Provincia creada correctamente');
        expect(response.body.data.name).toBe(mockProvince.name);

        provinceID1 = response.body.data.id;
    })

    it('Deberia registrar una provincia 2', async () => {
        const response = await request(app)
        .post('/provinces')
        .send(mockProvince)

        expect(response.statusCode).toBe(201);
        expect(response.body.msg).toBe('Provincia creada correctamente');
        expect(response.body.data.name).toBe(mockProvince.name);

        provinceID2 = response.body.data.id
    })

    it('Deberia traer todas las provincias 1 y 2', async () => {
        const response = await request(app)
        .get('/provinces')
        
        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toBe('Provincias obtenidas correctamente');
    })

    it('Deberia buscar provincias por ID', async () => {
        const response = await request(app)
        .get(`/provinces/${provinceID1}`)
        .expect(200)

        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.id).toBe(provinceID1)
    })

    it('Deberia modificar un provincia existente', async () => {
        
        const newname = 'Tucuman'
        const response = await request(app)
        .put(`/provinces/${provinceID1}`)
        .send({ name : newname })
        .expect(200)

        expect(response.body.data).toHaveProperty('id');
        expect(response.body.msg).toBe('Provincia actualizada correctamente')

        const updateResponse = await request(app)
        .get(`/provinces/${provinceID1}`)
        .expect(200)

        expect(updateResponse.body.data).toHaveProperty('id');
        expect(updateResponse.body.msg).toBe('Provincia obtenida correctamente')
    })

    it('Deberia eliminar Provincia1  y provincia2', async () => {
        await request(app)
        .delete(`/provinces/${provinceID1}`)
        .expect(200)

        await request(app)
        .delete(`/provinces/${provinceID2}`)
        .expect(200)

        await request(app)
        .get(`/provinces/${provinceID1}`)
        .expect(404)

        await request(app)
        .get(`/provinces/${provinceID2}`)
        .expect(404)
    })

}, 10000)