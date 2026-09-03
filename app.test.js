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

// Populate the in-memory DB with fresh test data before each test
beforeEach(async () => {
    await request(app).post('/api/v1/todo/').send({
        title: 'TestData Overdue task',
        description: 'Overdue',
        dueDate: 'Jan 1 2010',
        isCompleted: false
    })

    await request(app).post('/api/v1/todo/').send({
        title: 'TestData Incomplete Task',
        description: 'TestData Incomplete Task',
        dueDate: 'Dec 31 2030',
        isCompleted: false
    })

    await request(app).post('/api/v1/todo/').send({
        title: 'TestData Completed task',
        description: 'Completed',
        dueDate: 'Jan 1 2010',
        isCompleted: true
    })

    await request(app).post('/api/v1/todo/').send({
        title: 'TestData Completed Future Task',
        description: 'Completed Future Task',
        dueDate: 'Dec 31 2030',
        isCompleted: true
    })
})

// Clear every document from every collection to start fresh after each test
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany()
    }
})

// To-do List API integration tests
describe('To-do API', () => {
    describe('POST /', () => {
        test('should create a new item when all fields are passed', async () => {
            const response = await request(app).post('/api/v1/todo/').send({
                title: 'Title',
                description: 'Description',
                dueDate: 'Sep 3 2026',
                isCompleted: true
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.title).toBe('Title')
            expect(response.body.description).toBe('Description')
            expect(response.body.dueDate).toMatch(new RegExp('^2026-09-03'))
            expect(response.body.isCompleted).toBe(true)
        })

        test('should create a new item when only the title is passed', async () => {
            const response = await request(app).post('/api/v1/todo/').send({
                title: 'Title'
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.title).toBe('Title')
            expect(response.body.isCompleted).toBe(false)
        })

        test('should ignore fields that do not exist', async () => {
            const response = await request(app).post('/api/v1/todo/').send({
                title: 'Title',
                someMadeUpField: 'Some made up value'
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.title).toBe('Title')
            expect(response.body.someMadeUpField).toBeUndefined()
            expect(response.body.isCompleted).toBe(false)
        })

        test('should return an error when no title is passed', async () => {
            const response = await request(app).post('/api/v1/todo/').send({
                description: 'Description',
                dueDate: 'Sep 3 2026',
                isCompleted: true
            })
            expect(response.statusCode).toBe(400) //400 bad request
        })

        test('should return an error when dueDate is not a valid date', async () => {
            const response = await request(app).post('/api/v1/todo/').send({
                title: 'Title',
                dueDate: 'Hello 123 456'
            })
            expect(response.statusCode).toBe(400) //400 bad request
        })

        test('should return an error when isCompleted is not a boolean', async () => {
            const response = await request(app).post('/api/v1/todo/').send({
                title: 'Title',
                isCompleted: 'orange'
            })
            expect(response.statusCode).toBe(400) //400 bad request
        })
    })

    describe('GET /', () => {
        test('should return all 4 test items if no parameters are passed', async () => {
            const response = await request(app).get('/api/v1/todo/').send()
            expect(response.statusCode).toBe(200)
            expect(response.body.length).toBe(4)
        })

        test('should return a subset of items if a filter object is passed', async () => {
            const response = await request(app).get('/api/v1/todo/').send({
                filter: { isCompleted: true }
            })
            console.log(response.body)
            expect(response.statusCode).toBe(200)
            expect(response.body.length).toBe(2)
        })

        test('should return an error if filter is not valid', async () => {
            const response = await request(app).get('/api/v1/todo/').send({
                filter: 'Not a valid filter'
            })
            console.log(response.body)
            expect(response.statusCode).toBe(400)
        })

        test('should return all for test items sorted if a sort object is passed', async () => {
            const response = await request(app).get('/api/v1/todo/').send({
                sort: { dueDate: 1 }
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.length).toBe(4)
            expect(response.body[0].dueDate).toMatch(new RegExp('^2010-01-01'))
            expect(response.body[1].dueDate).toMatch(new RegExp('^2010-01-01'))
            expect(response.body[2].dueDate).toMatch(new RegExp('^2030-12-31'))
            expect(response.body[3].dueDate).toMatch(new RegExp('^2030-12-31'))
        })

        test('should return an error if sort is not valid', async () => {
            const response = await request(app).get('/api/v1/todo/').send({
                sort: 123
            })
            expect(response.statusCode).toBe(400)
        })

        test('should ignore fields that do not exist', async () => {
            const response = await request(app).get('/api/v1/todo/').send({
                someMadeUpField: 'Some made up value'
            })
            expect(response.statusCode).toBe(200)
        })
    })
})