const express = require('express');
const WebSocket = require('ws')
const path = require('path');
const cors = require('cors')
var cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 'https://epixel.up.railway.app'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cellsRouter = require(path.join(__dirname, 'routes', 'CellsRoutes'))
const propertiesRouter = require(path.join(__dirname, 'routes', 'PropertiesRoutes'))
const authRouter = require(path.join(__dirname, 'routes', 'AuthRoutes'))

app.use('/cells', cellsRouter);
app.use('/properties', propertiesRouter);
app.use('/auth', authRouter);

const server = app.listen(3001)

const wsserver = new WebSocket.Server({server})

wsserver.on('connection', (ws) => {
  console.log('new ws connection')

  ws.on('message', message => {
    console.log(`server received: ${message}`)

    wsserver.clients.forEach(client => {
      if(client.readyState === WebSocket.OPEN) {
        client.send(message, {binary: false})
      }
    })
  })
})