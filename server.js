const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/register', require('./src/routes/signup'));

app.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`);
})