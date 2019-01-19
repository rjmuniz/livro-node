const test = require('tape')
const index = require('../index')

test('aplicar desconto', t =>{
    t.assert(index.aplicarDesconto(10,5) === 5, 'Descontou corretamente')
    t.end()
})

test('aplicar desconto', t =>{
    t.assert(index.aplicarDesconto(10,15) === 0, 'Descontou valor maior')
    t.end()
})