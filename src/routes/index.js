const express = require('express');
const user = require('../controllers/user');

const router = express.Router();

router
    .get("/user", user.getAll)
    .get("/user/:cpf", user.getOne)
    .post("/user", user.create)
    .delete("/user/:cpf", user.delete)
    .put("/user/:cpf", user.edit)



module.exports = router;