const express = require('express');
const { engine } = require('express-handlebars')
const app = express();
const path = require('path')
const PORT = 3000;
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//body parser middleware
// app.use(bodyParser.json());


app.listen(PORT, function () {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));

//handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//static folder
app.use(express.static(path.join(__dirname, 'public')))


//db connection
db
    .sync() // <--- Troquei de 'authenticate' para 'sync'
    .then(() => {
        console.log('Conectou ao banco e criou as tabelas necessárias!');
    })
    .catch((err) => {
        console.log('Ocorreu um erro ao conectar: ' + err);
    });
//routes
app.get('/', function (req, res) {

    let search = req.query.job;

    if (!search) {


        Job.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then((jobs) => {
                res.render('index', {
                    jobs
                });
            })
            .catch(function (err) {
                res.send('Houve um erro: ' + err);
            });
    }else{
        Job.findAll({
            where: {
                title: {
                    [Op.like]: `%${search}%`
                }
            },

            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then((jobs) => {
                res.render('index', {
                    jobs, search
                });
            })
            .catch(function (err) {
                res.send('Houve um erro: ' + err);
            });
    }
});

// app.get('/', function (req, res) {
//     res.render('index');
// });


app.use('/jobs', require('./routes/jobs'));
module.exports = app;


