const type  = require('tape')
const supertest = require('supertest')
const app = require('../app')


type('GET /aplicarDesconto/10/3', t=>{
    supertest(app)
        .get('/aplicarDesconto/10/3')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res)=>{
            t.error(err, 'Sem Erros')
            t.assert(res.body.valorDescontado === 7, 'desconto correto')
            t.end()
        })

})