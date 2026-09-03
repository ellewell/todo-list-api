const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('./app')

let mongoServer

// Connect to an in-memory DB before running the tests
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
});

// Disconnect from the in-memory DB after running the tests
afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
});

// Clear every document from every collection to start fresh after each test
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany()
    }
})

// To-do List API integration tests
describe("To-do API", () => {
    describe("POST /", () => {
        test('should create a new item when all fields are passed', async () => {
            const response = await request(app).post('/api/v1/todo/').send({
                title: "Title",
                description: "Description",
                dueDate: "Sep 3 2026",
                isCompleted: true
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.title).toBe("Title")
            expect(response.body.description).toBe("Description")
            expect(response.body.dueDate).toMatch(new RegExp("^2026-09-03"))
            expect(response.body.isCompleted).toBe(true)
        })

        test('should create a new item when only the title is passed', async () => {
            const response = await request(app).post('/api/v1/todo/').send({
                title: "Title"
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.title).toBe("Title")
            expect(response.body.isCompleted).toBe(false)
        })

        test('should ignore fields that do not exist', async () => {
            const response = await request(app).post('/api/v1/todo/').send({
                title: "Title",
                someMadeUpField: "Some made up value"
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.title).toBe("Title")
            expect(response.body.someMadeUpField).toBeUndefined()
            expect(response.body.isCompleted).toBe(false)
        })

        test('should return an error when no title is passed', async () => {
            const response = await request(app).post('/api/v1/todo/').send({
                description: "Description",
                dueDate: "Sep 3 2026",
                isCompleted: true
            })
            expect(response.statusCode).toBe(400) //400 bad request
        })
    })

    test('should return a status 200 GET /', async () => {
        const response = await request(app).get('/api/v1/todo/').send()
        expect(response.statusCode).toBe(200)
    })
})