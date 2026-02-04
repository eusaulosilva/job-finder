const express = require('express');
const router = express.Router();
const Job = require('../models/Job');



//detalhe da vaga
router.get('/view/:id', function (req, res) {
    let id = req.params.id;

    Job.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (job) {
        if (job != undefined) {
            res.render('view', {
                job
            });
        } else {
            res.redirect('/');
        }
    }).catch(function (err) {
        res.send('Houve um erro: ' + err);
    });
});

router.get('/add', function (req, res) {
    res.render('add');
})

// add job via POST
router.post('/add', function (req, res) {
    let { title, description, salary, company, email, new_job } = req.body;
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    }).then(function () {
        res.redirect('/');
    }).catch(function (err) {
        res.send('Houve um erro: ' + err);
    });
});

router.get('/test', function (req, res) {
    res.send('Rota de testes de jobs funcionando!');
});



module.exports = router;