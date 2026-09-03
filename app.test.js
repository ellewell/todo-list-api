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

test('POST / should return with status 200', async () => {
    const response = await request(app).post('/').send({title: "Task 1"})
    expect(response.statusCode).toBe(200)
})

test('GET / should return with status 200', async () => {
    const response = await request(app).get('/').send()
    expect(response.statusCode).toBe(200)
})