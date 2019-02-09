const express = require('express');
const app = express();
const port = 3001
app.get('/', (req,res,next) =>{
    res.send('Executado com sucesso... <br/>' + port.toString() + ' ..... '+ req.params.nome)
})

app.listen(port,()=> console.log('http://localhost:'+port.toString()))