const express = require('express')
const app = express()


const port = 80

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  res.send(ip)
})

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  res.send(ip)
})

app.get('/health', (req, res) => {
  res.status(200).end()
})

app.get('/ready', (req, res) => {
  res.status(200).end()
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})