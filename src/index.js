const { request } = require('express')
const express = require('express')
const app = new express()
const apiDose = require('./routes/doseTraker')
const { errors, logErrors, wrapError } = require('./utils/errorHandler')
const config = require('./config')
app.use(express.json())


//routes
apiDose(app)


app.use(logErrors)
app.use(wrapError)
app.use(errors)

app.listen(config.PORT, () => console.log(`App started in port ${config.PORT}`))