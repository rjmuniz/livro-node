global.db = require('./db')

const express = require('express')
const bodyParser = require('body-parser')
const port = 3000

const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const router = express.Router()
router.get('/', (req, res, next) => {
    res.json({ message: 'Funcionando!' })
})
router.get('/clientes', (req,res)=>{
    global.db.findCustomers((err,result)=>{
        if(err) {res.status(500).json(err)}
        else res.json(result)
    })
})
router.get('/clientes/:id', (req,res)=>{
    var id = req.params.id
    global.db.findOne(id, (err,result)=>{
        if(err) {res.status(500).json(err)}
        else res.json(result)
    })
})
router.post('/clientes/', (req,res)=>{
    var customer = req.body
    global.db.insert(customer, (err,result)=>{
        if(err) {res.status(500).json(err)}
        else res.json({message:'cliente cadastrado com sucesso'})
    })
})

router.put('/clientes/:id', (req,res)=>{
    var id = req.params.id
    var customer = req.body
    global.db.update(id, customer, (err,result)=>{
        if(err) {res.status(500).json(err)}
        else res.json({message:'cliente update com sucesso'})
    })
})
router.patch('/clientes/:id', (req,res)=>{
    var id = req.params.id
    var customer = req.body
    global.db.updatePatch(id, customer, (err,result)=>{
        if(err) {res.status(500).json(err)}
        else res.json({message:'cliente update com sucesso'})
    })
})
router.delete('/clientes/:id', (req,res)=>{
    var id = req.params.id
    global.db.deleteOne(id, (err,result)=>{
        if(err) {res.status(500).json(err)}
        else res.json({message:'cliente excluido com sucesso'})
    })
})

app.use('/', router)



app.listen(port)