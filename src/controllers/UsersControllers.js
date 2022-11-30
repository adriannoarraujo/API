const AppError = require('../utils/app.Erro.js');
/**
 * ---No máximo um Controllers vai ter 5 métodos e esse é o padrão---
 * Um Controllers pode ter a função de index - GET para listar vários registros , exemplo listar todos os usuários cadastrados
 * Show - para exibir um registro especifico - mostrar os dados de um usuário especifico 
 * create - POST para criar o registro
 * update - PUT para atualizar um registro
 * delete - DELETE para remover um registro
 */

class UsersControllers{
    create(request, response){
        const { name, email, password } = request.body;

        if(!name){
            throw new AppError(" Nome é obrigatórios");
        }
        //response.send("Você chamou o método POST");
        //response.json(` Seu nome ${name}, seu email ${email}, sua senha ${password}`);
        response.status(201).json({ name, email, password});
    }
}

module.exports = UsersControllers