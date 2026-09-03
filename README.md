# To-Do List API

## Build / Run
    npm install
    export TODO_PORT=<port>
    export MONGO_URI="<uri>"
    npm run start

Make sure to replace \<port\> with the port that you want to run the server on (for example, 3000) and \<uri\> with the mongodb uri of your database (usually looks like this, mongodb+srv://\<name\>:\<pass\>@\<host\>/\<db\>)

For local testing you can also create a .env file using dotenv.template as a template

## Build / Run with docker
    docker compose up

## Api
### Create a new to-do item.
    curl --request POST \
        --url http://localhost:3000/api/v1/todo \
        --header 'Content-Type: application/json' \
        --data '{
            "title": "Title",
            "description": "Description",
            "dueDate": "Sep 3 2026",
            "isCompleted": true
        }'
- title (string): is required
- description (string): is optional
- dueDate (date string): is optional
- isCompleted (boolean): is optional but defaults to false if not passed
- Any additional fields will be ignored

### Display all to-do items
    curl --request GET \
        --url http://localhost:3000/api/v1/todo \
        --header 'Content-Type: application/json' \
        --data '{
            "filter": { "isCompleted": true },
            "sort": { "dueDate": 1 }
        }'
- filter (mongodb find args): optional
- sort (mongodb sort args): optional
- Any additional fields will be ignored

### Show details of a specific to-do item by its ID.
    curl --request GET \
        --url http://localhost:3000/api/v1/todo/:id
- :id (the _id value an existing item): required

### Modify the title, description, or due date of an existing item by its ID.
    curl --request PUT \
        --url http://localhost:3000/api/v1/todo/:id \
        --header 'Content-Type: application/json' \
        --data '{
            "title": "Title",
            "description": "Description",
            "dueDate": "Sep 3 2026"
        }'
- :id (the _id value an existing item): required
- title (string): is optional
- description (string): is optional
- dueDate (date string): is optional

### Mark a specific to-do item as completed by its ID.
    curl --request PATCH \
        --url http://localhost:3000/api/v1/todo/:id \
        --header 'Content-Type: application/json' \
        --data '{
            "isCompleted": true
        }'
- :id (the _id value an existing item): required
- isCompleted (boolean): is optional

### Mark a specific to-do item as not completed by its ID.
    curl --request PATCH \
        --url http://localhost:3000/api/v1/todo/:id \
        --header 'Content-Type: application/json' \
        --data '{
            "isCompleted": false
        }'
- :id (the _id value an existing item): required
- isCompleted (boolean): is optional

### Remove a to-do item by its ID.
    curl --request DELETE \
        --url http://localhost:3000/api/v1/todo/:id
- :id (the _id value an existing item): required

## Run Tests
    npm test

## Design choices, assumptions and trade-offs

Programming Language: I will be implementing my solution in JavaScript (Node.js), but I may add TypeScript later if it looks like the benefits of static type checking will be worth the added complexity

Interface: I will be implementing a RESTful API as my interface, this way I can focus on the backend logic and still have the option to write a SPA frontend in React later if there's time remaining

Testing strategy: I will focus on integration testing my API using Jest + Supertest, but I may add additional unit tests if there's any business logic that needs testing.

Persistence: I will be using mongodb with mongoose as my ODM (object document mapper).Mongodb is scalable and by using mongoose there won't be much add complexity, in fact this approach may simplify some of the business logic and make it easier to implement some of the optional enhancements like filtering, sorting and input validation if there's time. For testing I will use the mongodb memory server.

I decided to allow the client to pass args directly to the mongoose find and sort methods. This is quick to implement, provides the most flexibility and shouldn't increase the complexity of apps using the api by much. I can create a v2 api with a simpler interface later if there is time.
