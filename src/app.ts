import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import ticketRoutes from './routes/ticketRoutes';
import ticketCommentRoutes from './routes/ticketCommentRoutes';
import ticketStatusRoutes from './routes/ticketStatusRoutes';
import ticketPriorityRoutes from './routes/ticketPriorityRoutes';
import ticketCategoryRoutes from './routes/ticketCategoryRoutes';
import ticketHistoryRoutes from './routes/ticketHistoryRoutes';
import roleRoutes from './routes/roleRoutes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'API de ResuelveT ejecutándose' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/comments', ticketCommentRoutes);
app.use('/api/statuses', ticketStatusRoutes);
app.use('/api/priorities', ticketPriorityRoutes);
app.use('/api/categories', ticketCategoryRoutes);
app.use('/api/history', ticketHistoryRoutes);
app.use('/api/roles', roleRoutes);

export default app;