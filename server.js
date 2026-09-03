const mongoose = require('mongoose')
const app = require('./app')
const port = 3000
const mongo_uri = "<my_mongo_db_uri>"

async function main() {
    await mongoose.connect(mongo_uri)
    console.log("Connected to the DB.")

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

main()