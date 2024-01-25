const { authRoutes } = require('../myDemoApp/src/routes/userRoutes.js');
const cors = require('cors')

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const db = require('../myDemoApp/src/config/mongoConnection');
// Middleware
app.use(cors())
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
