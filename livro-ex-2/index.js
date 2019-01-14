const express = require('express')
const fs = require('fs')

const app = express();

app.get('/', processRequest)

function processRequest(req, res){
    console.log('Requisição: iniciou')
    readTest(req, res);
    console.log('Requisição: terminou')
}
function readTest(req,res){
    console.log('  lendo arquivo: Inicio')
    fs.readFile('text.txt', function(err,data){
        console.log('    leu arquivo: inicio')     
        if(err){
            console.log('erro na leitura')
            return res.status(500).send('Erro ao ler o arquivo')
        }
        res.write(data)
        res.end();
        console.log('    leu arquivo: fim')        
    })

    console.log('  lendo arquivo: fim')
}

app.listen(3000)