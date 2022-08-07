const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use('/register', require('./src/routes/signup'));

app.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`);
})