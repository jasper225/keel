const dotenv = require('dotenv');
dotenv.config({ path: require('path').resolve(__dirname, '.env') });

const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');

const app = express();
const httpServer = http.createServer(app);

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/accounts', require('./routes/accountRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/tags', require('./routes/tagRoutes'));
app.use('/api/budgets', require('./routes/budgetRoutes'));
app.use('/api/recurringTransactions', require('./routes/recurringTransactionRoutes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Unknown error' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

module.exports = app;