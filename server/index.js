const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config();
const app = express();
const port = process.env.PORT;
//middle
app.use(cors())
app.use(express.json());

//routes
app.use('/auth', require('./routes/auth'))
app.use('/dashboard', require('./routes/dashboard'))
app.use('/users', require('./routes/users'))

//port
app.listen(port, ()=>{
    console.log(`Server is running at port: ${port}`)
})