import express from "express";
import bookingRouter from './routers/booking';
const app = express();

app.use(express.json())
app.use('/book',bookingRouter);

app.listen(5000)