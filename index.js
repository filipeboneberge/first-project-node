// const { request, response } = require("express");
const express = require("express");
const uuid = require("uuid");
const port = 3001;
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());




//Query Params
// app.get("/users", (request, response) => {

//     // console.log(request.query);
//     const {name, age} = request.query;

//     return response.json({name: name, age: age});
// });

//Route Params

// app.get("/users/:id", (request, response) => {

//     const {id} = request.params;
//     //console.log(id);

//     return response.json({id});
// });



//Body Params
// app.get("/users", (request, response) => {

//     const {name, age} = request.body;
//     // console.log(request.body);

//     return response.json({name, age});
// });





const users = [];


//Middleware

const checkUserId = (request, response, next) => {

    const {id} = request.params;

    const index = users.findIndex(user => user.id === id);

    if(index < 0){
        return response.status(404).json({error: "User not found!"});
    }

    request.userIdex = index;
    request.userId = id;

    next();
}

//Listar Usuarios

app.get("/users", (request, response) => {

    return response.json(users);
});


//Criar Usuarios

app.post("/users", (request, response) => {

    const {name, age} = request.body;
    const user = {id: uuid.v4(), name, age};
    
    users.push(user);

    return response.status(201).json(user);
});


//Atualizar Usuarios

app.put("/users/:id", checkUserId, (request, response) => {

    const {name, age} = request.body;
    const index = request.userIdex;
    const id = request.userId;
    const updateUser = {id, name, age};

    users[index] = updateUser;

    return response.json(updateUser);
});

//Deletar

app.delete("/users/:id", checkUserId, (request,response) => {

    const index = request.userIdex;
    users.splice(index, 1);

    return response.status(204).json();

});

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`);
});
