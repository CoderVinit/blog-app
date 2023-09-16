import express from 'express';
import mongoose from 'mongoose';

import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/user", router)
app.use("/api/blog", blogRouter)


mongoose.connect('mongodb+srv://vinitpatel8896:vinitpatel8896@blog-app.5qlswyy.mongodb.net/?retryWrites=true&w=majority').then(() =>
    app.listen(5001)).then(() =>
        console.log("Database Connected to the localhost 5001")
    )
    .catch((err) => {
        console.log(err)
    }
    )