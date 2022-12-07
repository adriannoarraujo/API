// hash faz a criptografia e o compare compara a senha atual enviada pelo isominia com a que está no banco
const { hash, compare } = require ("bcryptjs")
const AppError = require('../utils/app.Erro.js');
const sqliteConnection = require('../database/sqlite');
/**
 * ---No máximo um Controllers vai ter 5 métodos e esse é o padrão---
 * Um Controllers pode ter a função de index - GET para listar vários registros , exemplo listar todos os usuários cadastrados
 * Show - para exibir um registro especifico - mostrar os dados de um usuário especifico 
 * create - POST para criar o registro
 * update - PUT para atualizar um registro
 * delete - DELETE para remover um registro
 */

class UsersControllers{
    async create(request, response){
        const { name, email, password } = request.body;

        // if(!name){
        //     throw new AppError(" Nome é obrigatórios");
        // }

        const database = await sqliteConnection();
        const checkUserExists = await database.get("SELECT * FROM users where email = (?)",[email]);

        if(checkUserExists){
            throw new AppError("Email já está em uso.");
        }

        // criptografar senha 
        const hashedPassword = await hash(password, 8);

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",[name, email, hashedPassword]);

        return response.status(201).json();




        //response.send("Você chamou o método POST");
        //response.json(` Seu nome ${name}, seu email ${email}, sua senha ${password}`);
        //response.status(201).json({ name, email, password});
    }

    async update(request, response){
        const { name, email, password, old_password} = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user){
            throw new AppError("Usuário não encontrado");
        }

        const usersUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
        
        if(usersUpdatedEmail && usersUpdatedEmail.id !== user.id){
            throw new AppError("Este email já está em uso");
        }
        // colocamos ?? pq se tiver conteúdo em nome grava nome se não grava user.nome
        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password){
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
        }
        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password);
            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere");
            }


            user.password = await hash(password, 8);
        }


        await database.run(`
            UPDATE users SET
            name =?,
            email=?,
            password=?,
            updated_at = DATETIME ('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, id]
        );

        return response.status(200).json();

    }


}

module.exports = UsersControllers