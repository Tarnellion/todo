const fastify = require('fastify')
const mysql = require('mysql')

const app = fastify({ logger: true });

app.register(require('fastify-cors'), {})
app.register(require('fastify-xml-body-parser'), {})

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

app.listen(8000, () => { console.log('app str...'); })

let dbData;
conn.query('SELECT * FROM ToDoList', (err, result, field) => {
    dbData = result
})
app.get('/', (req, res) => {
    res.send(dbData)
})
app.post('/', (req, res) => {
    let data = [req.body.id, req.body.task, req.body.isDone]
    conn.query('INSERT INTO `ToDoList`(`id`, `task`, `isDone`) VALUES (?,?,?)', data, (err, results, fields) => {
        !err ? res.json(results) : res.json(err)
    })
})