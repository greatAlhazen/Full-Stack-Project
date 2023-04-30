const app = require('../app');
const {mongoConnection, mongoDisconnection} = require('../config/mongoDB.config');
const req = require('supertest');


describe('Test all api',() => {
    // before all test running create mongodb connection
   beforeAll(async () => {
        await mongoConnection();
    });

     // after all test running destroy mongodb connection
    afterAll(async () => {
        await mongoDisconnection();
    })

    // fix bug related timers
    beforeEach(() => {
        jest.useFakeTimers();
    })

    describe('Get route',() =>{
        test('should be 200 response',async () =>{
            
            const res =await req(app).get('/flights').expect('Content-Type', /json/).expect(200); 
        });
    });
    
    describe('Post route',() => {
        const flightData ={ 
        mission:'New Discover',
        rocket: 'Taren-1',
        destination:'Kepler-442 b',
        date:'February 6,2050',
        }
        const withoutDate = {
        mission:'New Discover',
        rocket: 'Taren-1',
        destination:'Kepler-442 b',
        }
    
        test('should be 201 response',async () => {
            const res = await req(app)
            .post('/flights')
            .send(flightData).expect('Content-Type',/json/).expect(201)
    
            const reqDate = new Date(flightData.date).valueOf();
            const resDate = new Date(res.body.date).valueOf();
    
            expect(reqDate).toBe(resDate);
            expect(res.body).toMatchObject(withoutDate);
        });
    
        test('required field',async () => {
            const res = await req(app)
            .post('/flights')
            .send(withoutDate).expect('Content-Type',/json/).expect(400)
    
            expect(res.body).toStrictEqual({
                error:'Please fill required fields'
            })
        });
    
        test('valid date',async () => {
            const res = await req(app)
            .post('/flights')
            .send(Object.assign(withoutDate,{date:'anything'}))
            .expect('Content-Type',/json/).expect(400)
    
            expect(res.body).toStrictEqual({
                error:'Invalid date'
            })
        })
    });
})
