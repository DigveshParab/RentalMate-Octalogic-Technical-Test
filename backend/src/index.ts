import express from "express";
import bookingRouter from './routers/booking';
const app = express();
import cors from 'cors'


cors
app.use(express.json())
app.use(cors())
app.use('/book',bookingRouter);

app.listen(5000)