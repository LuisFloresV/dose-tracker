const express = require('express')
const app = new express()
const apiDose = require('./routes/doseTraker')
app.use(express.json())


//routes
apiDose(app)


app.listen(9000, () => console.log(`App started in port 9000`))