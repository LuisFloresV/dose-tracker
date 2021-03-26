const express = require('express')
const apiDose = require('./routes/doseTraker')
const { errors, logErrors, wrapError } = require('./utils/errorHandler')
const notFoundHandler = require('./utils/404Handler')
const config = require('./config')

// new Express app
const app = new express()
// Json Parser
app.use(express.json())


// routes
apiDose(app)
// 404 Handler
app.use(notFoundHandler)

// Error middleware
app.use(logErrors)
app.use(wrapError)
app.use(errors)

//Port init
app.listen(config.PORT, () => console.log(`App started in port ${config.PORT}`))