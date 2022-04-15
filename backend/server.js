import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import employeeRouter from './routers/employeeRouter.js';
import companyRouter from './routers/companyRouter.js';



dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));




mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 // useCreateIndex: true,
});

const port = process.env.PORT || 8000;


app.use('/api/company',companyRouter);
app.use('/api/employee', employeeRouter);
app.get('/', (req, res) => {
    res.send('Server is ready');
});


app.use((err,req,res,next)=>{
    res.status(500).send({message: err.message})
})


app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
})

