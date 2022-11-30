const sqLiteConnection = require("../../sqlite");
const createUsers = require("./createUsers.js");

async function migrationsRun(){
    const schemas = [
        createUsers
    ].join('');

   sqLiteConnection()
   .then( db => db.exec(schemas))
   .catch( error => console.error(error))
}

module.exports = migrationsRun;