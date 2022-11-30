const Router = require("express");
const UsersControllers = require("../controllers/UsersControllers");


const usersRoutes = Router();

function myMiddleware(request, response, next) {
    if(!request.body.isAdmin) {
        return response.json({message:" Não autorizado"});
    }
    next();
}

//Aplicar o Middleware para todas as rotas
//usersRoutes.use(myMiddleware);


const usersControllers = new UsersControllers();

//Método POST =  criação
//body params - tem que enviar via JSON (isominia) as informações do cadastro
//Quando essa rota for chamada tem que acessar o controller dela
//Aplicar o Middleware na rota 
usersRoutes.post('/', myMiddleware, usersControllers.create);
    


// app.get('/', (require, response) => {
//     response.send("Hello, world!");
// });

// Parâmetros - Route params = /:id/:user - VALORES OBRIGATÓRIOS
// Params são utilizados para dados simples(mais utilizado id)
// http://localhost:3333/users/30/adriano
// usersRoutes.get('/users/:id/:user', (request, response) => {
//     const { id, user } = request.params;
//     response.send(`ID do usuário = ${id}. Usuário ${user}`);
// });

// query params = consultas de parâmetros
//depois da ? inicia o query params - VALORES OPCIONAIS
// http://localhost:3333/users?page=5&limit=10
// usersRoutes.get('/users/', (request, response) => {
//     const { page, limit } = request.query;
//     response.send(`Página = ${page} e Mostrar: ${limit}`);
// });



module.exports = usersRoutes;