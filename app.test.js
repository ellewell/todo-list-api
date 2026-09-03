const request = require('supertest')
const app = require('./app')

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
});

afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany()
    }
})

describe("To-do API", () => {
    test('should return a status 200 on POST /', async () => {
        const response = await request(app).post('/api/v1/todo/').send({title: "Task 1"})
        expect(response.statusCode).toBe(200)
    })

    test('should return a status 200 GET /', async () => {
        const response = await request(app).get('/api/v1/todo/').send()
        expect(response.statusCode).toBe(200)
    })
})