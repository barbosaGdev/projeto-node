const express = require('express')
const routes = require('./routes/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

const port = 3000

app.listen(port, () => {
    console.log(`Projeto rodando na porta ${port}`)
})

