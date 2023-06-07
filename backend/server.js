const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');
const key = require('./config/keys')
const userrouter = require('./router/userRouter')
const blogrouter = require('./router/blogRouter')

const app = express()

app.use(cors());

const port = process.env.PORT || 8000

mongoose.connect(key.mongoURL)
  .then(result => console.log(`Mongo connected`))
  .catch(err => console.log(err))

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/api/users', userrouter)
app.use('/api/blog', blogrouter)
app.use(express.static(path.join(__dirname, 'public')));
// Router

app.listen(port, () => console.log(`Server started on PORT ${port}`))
