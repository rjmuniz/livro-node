var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  global.db.findAll((e, docs) => {
    if (e) { return console.error(e) }
    res.render('index', { title: 'Express', docs });
  })

});

router.get('/new', function (req, res, next) {
  res.render('new', { title: 'Cadastro de cliente', doc: {}, action: '/new' });
});

router.post('/new', function (req, res, next) {
  const nome = req.body.nome
  const idade = parseInt(req.body.idade)
  const uf = req.body.uf
  global.db.insert({ nome, idade, uf }, (err, result) => {
    if (err) { return console.err(err) }
    res.redirect('/?new=true')
  })
});

router.get('/edit/:id', function (req, res, next) {
  const id = req.params.id
  global.db.findOne(id, (err, doc) => {
    if (err) { return console.error(err) }
    res.render("new", { title: 'Edição de Cliente', doc, action: '/edit/' + doc._id })
  })
})
router.post('/edit/:id', function (req, res, next) {
  const id = req.params.id
  const nome = req.body.nome
  const idade = parseInt(req.body.idade)
  const uf = req.body.uf
  global.db.update(id, { nome, idade, uf }, (err, result) => {
    if (err) { return console.error(err) }
    res.redirect('/?edit=true')
  })
})

module.exports = router;
