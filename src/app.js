const express = require('express');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cors = require('cors');
const app = express();
const port = 3000

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(productRoutes);

app.listen(port, () => {
    console.log(`App running at:`)
    console.log(`- Local: http://localhost:${port}`)
})