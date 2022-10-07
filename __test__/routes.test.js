import supertest from 'supertest'
const app = require('./../app')
const data = require('../resources/data.json')
describe("/addresses",()=>{
    describe("GET addresses route", ()=>{
        it("should return all the addresses", async()=>{
            // expect(true).toBe(true);
            await supertest(app).get('/api/v1/addresses')
            .expect(200)
        })

        it('should contain a valid schema',async()=>{
            const resp = await supertest(app).get('/api/v1/addresses')
            console.log(resp.body);
            expect(resp.body).toBeInstanceOf(Array)            
            expect(resp.body.length).toBeGreaterThanOrEqual(data.length)
            expect(Object.keys(resp.body[0]).includes('organization')).toBeTruthy()
        })

        it('should return 404 if invalid endpoint is requested',async ()=>{
            const resp = await supertest(app).get('/api/v1/address')
            expect(resp.status).toBe(404)
        })
    })

   
})

