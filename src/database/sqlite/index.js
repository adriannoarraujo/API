const sqlite3 = require("sqlite3");
const sqLite = require("sqlite");
// Resolve os endereços de acordo com os ambiente windows/linux/mac
const path = require("path");


async function sqliteConnection(){
    const db = await sqLite.open({
        filename: path.resolve(__dirname, ".." , "database.db") ,
        driver: sqlite3.Database
    })
    
}

module.exports = sqliteConnection

