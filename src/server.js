import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import path from 'path';
import { connection } from './services/socket.io.js';

dotenv.config();
const app = express();
const server = createServer(app);
connection(server);

//Middleware
import { connectDB } from './config/database.js';
import errorHandler from './middlewares/error-handler.middleware.js';
import helmet from 'helmet';
import fileUpload from 'express-fileupload';

app.use(fileUpload());
app.use(express.static(path.join(process.cwd(), 'uploads')));
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
import drinkRouter from './routes/drinks.js';
import milliyRoute from './routes/milliyFoods.js';
import orderRouter from './routes/order.js';
import pizzaRouter from './routes/pizzas.js';
import saladRouter from './routes/salads.js';
import authRouter from './routes/auth.js';
import routerPayment from './routes/payment.js';
import routerToPayment from './routes/paymentType.js';
import routerPayOrder from './routes/orderPay.js';
import routerDiscount from './routes/discount.js';
import { uploadFile, removeFile } from './libs/fileupload.js';

app.post('/api/upload/file', uploadFile);
app.use('/api/payment', routerPayment);
app.use('/api/to/payment', routerToPayment);
app.use('/api/pay/order', routerPayOrder);
app.use('/api/drink', drinkRouter);
app.use('/api/milliyFood', milliyRoute);
app.use('/api/pizza', pizzaRouter);
app.use('/api/salad', saladRouter);
app.use('/api/order', orderRouter);
app.use('/api/auth', authRouter);
app.use('/api/discount', routerDiscount);

app.use(errorHandler);
const PORT = process.env.PORT || 3000;

connectDB();
server.listen(PORT, () => console.log(`Server started on the port ${PORT}`));
