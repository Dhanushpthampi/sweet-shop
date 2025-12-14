import express from "express";
import authRoutes from './routes/auth.routes';
import sweetRoutes from './routes/sweet.routes';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/sweets',sweetRoutes);

export default app;
