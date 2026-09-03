# To-Do List API

## Build / Run
    npm install
    npm run start

## Run Tests
    npm test

## Design choices, assumptions and trade-offs

Programming Language: I will be implementing my solution in JavaScript (Node.js), but I may add TypeScript later if it looks like the benefits of static type checking will be worth the added complexity

Interface: I will be implementing a RESTful API as my interface, this way I can focus on the backend logic and still have the option to write a SPA frontend in React later if there's time remaining

Testing strategy: I will focus on integration testing my API using Jest + Supertest, but I may add additional unit tests if there's any business logic that needs testing.

Persistence: I will be using mongodb with mongoose as my ODM (object document mapper).Mongodb is scalable and by using mongoose there won't be much add complexity, in fact this approach may simplify some of the business logic and make it easier to implement some of the optional enhancements like filtering, sorting and input validation if there's time. For testing I will use the mongodb memory server.
