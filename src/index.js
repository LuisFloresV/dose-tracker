const express = require('express')
const app = new express()
const apiDose = require('./routes/doseTraker')
const apiUser = require('./routes/userRoutes')

const { logErrors, wrapError,errorHandler } = require('./utils/errorHandler')
const notFoundHandler = require('./utils/404Handler')
const config = require('./config')


// Json Parser
app.use(express.json())


// routes
apiDose(app)
apiUser(app)

// 404 Handler
app.use(notFoundHandler)

// Error middleware
app.use(logErrors)
app.use(wrapError)
// app.use(errors)
app.use(errorHandler)



//Port init
app.listen(config.PORT, () => console.log(`App started in port ${config.PORT}`))