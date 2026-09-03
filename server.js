require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

async function main() {
    // Read the config from environment variables
    const requiredVars = ['TODO_PORT', 'MONGO_URI'];
    const missingVars = requiredVars.filter(key => !process.env[key]);
    if (missingVars.length > 0) {
        for (v of missingVars) {
            console.error(`Error: The environment variable ${v} must be set.`)
        }
        return
    }
    const port = process.env.TODO_PORT
    const mongo_uri = process.env.MONGO_URI

    // Connect to the DB
    await mongoose.connect(mongo_uri)
    console.log('Connected to the DB.')

    // Start the http server
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

main()