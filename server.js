const express = require('express')
const userRouter = require('./routes/userRoutes')

const app = express()

app.use(express.json({ limit: '10kb' }))

app.use('/', userRouter)

app.listen(3000)
