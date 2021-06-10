const express = require('express');
const user = require('../controllers/user');

const router = express.Router();

router
    .get("/users", user.getAll)
    .get("/user", user.getOne)
    .post("/user", user.create)
    .delete("/user/:cpf", user.delete)
    .put("/user/:cpf", user.edit)



module.exports = router;