const express = require('express');
const app = express();
const port = 3002
app.get('/', (req,res,next) =>{
    res.send('Executado com sucesso... <br/>' + port.toString() + ' ..... '+ req.query.nome)
})
app.get('/test2', (req,res,next) =>{
    res.send('Test2. Executado com sucesso... <br/>' + port.toString() + ' ..... '+ req.params.nome)
})
app.listen(port,()=> console.log('http://localhost:'+port.toString()))