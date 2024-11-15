const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
    credentials: true, 
  }));


const port = 5000
const mongoDB = require('./db')
app.use(express.json())
mongoDB();
app.use('/api',require('./routes/userRoutes'));
app.use('/api',require('./routes/taskRoute'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })