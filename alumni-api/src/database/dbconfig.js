const db = require('sqlite3')
const connection = new db.Database('./alumni.db', (err) =>{
    if(err){
        console.error(err)
    }
    else{
        console.log('Alumni DB connection Success')
    }
})
//User Table
const createAlumniTable = () =>{
    connection.run(`
        create table IF NOT EXISTS alumni(
        id INTEGER,
        profilePic TEXT NOT NULL,
        linkedinUrl TEXT NOT NULL,
        thisMonthappearanceCount INTEGER NOT NULL DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP )`
        , (err) =>{
            if(err){
                console.error(err)
            }
            else{
                console.log("Table Alumni Successfully created")
            }
        }) 
}
const createbidsTable = () => {
    connection.run(`
        CREATE TABLE IF NOT EXISTS bids(
            id INTEGER PRIMARY KEY,
            alumniID INTEGER NOT NULL,
            amount REAL NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (alumniID) REFERENCES alumni(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Table Bids Successfully created");
        }
    });
}
createAlumniTable()
createbidsTable()
module.exports = connection
