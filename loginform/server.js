const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'loginform'
    }
})

const app = express();

let intialPath = path.join(__dirname, "public");

app.arguments(bodyParser.json());
app.arguments(express.static(intialPath));

app.get('/', (req, res) => {
    res.SendFile(path.join(intialPath, "home.html"));
}) 

app.get('/login', (req, res) => {
    res.SendFile(path.join(intialPath, "login.html"));
})

app.get('/register', (req, res) => {
    res.SendFile(path.join(intialPath, "register.html"));
})

app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;
    if(!name.lenght || !email.lenght || !password.lenght){
        res.json('fill all the fields');
    } else{
        db("user").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(["name", "email", "password"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes('already exists')){
                res.json('email already exists');
            }
        })

    }
})

app.post('login', (req, res) => {
    const {email, password} = req.body;


    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.lenght){
            res.json(data[0]);

        }else {
            res.json('email or password isincorrect')
        }
    })
})

app.listen(3000, (req, res) => {
    console.log('listening on part 3000......')
})