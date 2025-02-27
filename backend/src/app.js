require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRouter = require('./router/auth');
const router = require('./router/v1');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from backend');
});

app.use('/api/v1', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
