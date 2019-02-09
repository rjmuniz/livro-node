const http = require('http');
const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();

const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const serv1 = httpProxy('http://localhost:3001')
const serv2 = httpProxy('http://localhost:3002')

app.get('/test1', (req,res,next)=>{
    req.url = '/';
    serv1(req,res,next)
})
app.get('/test2', (req,res,next)=>{
    req.url = '/';
    serv2(req,res,next)
})

app.use(logger('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

const server = http.createServer(app)
server.listen(3005, ()=>{
    console.log('http://localhost:3005')
})

