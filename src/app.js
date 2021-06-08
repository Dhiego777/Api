const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const port = 3000

app.use(cors());
app.use(routes);

app.listen(port, () => {
    console.log(`App running at:`)
    console.log(`- Local: http://localhost:${port}`)
})