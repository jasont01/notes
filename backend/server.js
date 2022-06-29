require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

app.use('/api/notes', require('./routes/noteRoutes'))

mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => {
    console.log(`MongoDB Connected: ${conn.connection.host}`)
    app.listen(process.env.PORT, () =>
      console.log(`Server started on port: ${process.env.PORT}`)
    )
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
