require("express-async-errors")
const AppError = require("./utils/app.Erro.js");
const database = require("./database/sqlite/Migrations")
const express = require("express");
const routes = require("./routes"); 

database()
//inicializando o express
const app = express();
//Para informar no POST que está trabalhando com JSON
app.use(express.json());


app.use(routes);


//inicializando a biblioteca express-async-errors para tratamento de erros
app.use((error, request, response, next) => {
    //identificar que o erro é do lado cliente - exemplo falta de nome
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            Message: error.message
        });
    }
    console.error(error);

    // se o erro for do servidor
    return response.status(500).json({
        status: "error",
        message: "Internal server error"

    })
});


//inicializando o servidor
const port = 3333;
app.listen(port, () => console.log(`server is running on port ${port}`));



