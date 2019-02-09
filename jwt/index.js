require("dotenv-safe").load();
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
const morgan = require('morgan')
const helmet = require('helmet')

var app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//auth
app.post("/login", (req, res, next) => {
    if (req.body.user === 'admin' && req.body.pwd === '123') {
        const idUser = 1; // id do usuario
        var token =
            jwt.sign({
                userId: idUser,
                userName: req.body.user
            },
                process.env.SECRET, {
                    expiresIn: 60
                });
        res.status(200).send({ auth: true, token });
    } else {
        res.status(500).send('Login Inválido');
    }

});

app.get("/logout", (req, res, next) => {
    res.status(200).send({ auth: false, token: null });
})

function verifyJWT(req, res, next) {
    var token = req.headers['authorization'];
    if (!token)
        return res.status(401).send({ auth: false, message: 'No token provided.' })

    if(token.startsWith('Bearer '))
        token = token.substr(7);
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'erro', err });

        req.userId = decoded.userId;
        req.userName = decoded.userName;

        next();
    })
}

app.get('/test1', (req,res,next)=>{
    res.status(200).send('Mensagem sem autenticação')
})

app.get('/test2',verifyJWT, (req,res,next)=>{
    res.status(200).send('Mensagem com autenticação')
})

app.listen(process.env.PORT, () => {
    console.log('Iniciado em: http://localhost:' + process.env.PORT.toString());
})