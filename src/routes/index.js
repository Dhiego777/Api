const express = require('express');
const user = require('../controllers/user');

const router = express.Router();

router
    .get("/users", user.getAll)
    .get("/user", user.getOne)
    .post("/user", user.create)
    .delete("/user", user.delete)
    .put("/user", user.edit)



module.exports = router;