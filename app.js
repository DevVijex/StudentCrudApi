const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const cors = require('cors');
const connectDB = require('./src/config/db');
const studentRouter = require('./src/routes/student.routes');



dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.get('/', (req, res)=> {
    res.send('Welcome To My Home Page')
});

app.use('/api/students', studentRouter);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () =>{
     connectDB();
     console.log(`🚀 Server running on http://localhost:${PORT}`)
});