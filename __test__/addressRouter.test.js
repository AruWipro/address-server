import supertest from 'supertest'
const app = require('./../app')

describe('POST address route', ()=>{
    describe("Send valid address based on source and destination", ()=>{
        it("Should return 400 for an inValid request", async()=>{
            // Send invalid request
            await supertest(app).post('/api/v1/addresses')
            .send({
                "latitude":1.284479,
                "range": 20
            })
            .expect('Content-Type', /json/)
            .expect(400)
        })
        it("Should return 200 for a valid request", async()=>{
            await supertest(app).post('/api/v1/addresses')
            .send({
                "latitude":1.284479,
                "longitude": 103.75108200000002,
                "range": 20
            })
            .expect('Content-Type', /json/)
            .expect(200)
        })

        it("Should return 200 for a valid request", async()=>{
           const response =  await supertest(app).post('/api/v1/addresses')
            .send({
                "latitude":1.284479,
                "longitude": 103.75108200000002,
                "range": 20
            })
            expect(response.body).not.toBeNull()
            // Check if address is present in the response
            expect(response.body[0].address).not.toBeNull()
            // Check if there is distance attribute in response
            expect(response.body[0].address.distance).not.toBeNull()
            // Check if the distance is not greater than 20Km
            expect(response.body[0].address.distance).not.toBeGreaterThan(20)
        })
    })
})