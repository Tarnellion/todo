const fastify = require('fastify')
const mysql = require('mysql')


const app = fastify();
app.register(require('fastify-cors'), {
    // put your options here
})

const conn = mysql.createConnection({
    host: 'localhost',
    port: '6033',
    user: 'root',
    password: 'my_secret_password',
    database: 'mydb'
})

conn.connect(err => {
    if (err) {
        return console.error("Ошибка: " + err.message);;
    } else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
})

// conn.end(err => {
//     if (err) {
//         return console.log("Ошибка: " + err.message);
//     }
//     console.log("Подключение закрыто");
// });

app.listen(8000, () => { console.log('app started...'); })

let dbData;
conn.query('SELECT * FROM ToDoList', (err, result, field) => {
    dbData = result
})
app.get('/', (req, res) => {
    res.send(dbData)
})