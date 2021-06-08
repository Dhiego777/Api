const express = require('express');
const cadastro = require('../controllers/cadastro');

const router = express.Router();

router
    .get("/cadastro", cadastro.cliente)
    .post("/cadastro/add", cadastro.addCadastro)
    .post("/cadastro/remove", cadastro.removeCadastro)
    .put("/cadastro/edit",cadastro.editarCadastro)
    .get("/cadastro/getCadastros", cadastro.getCadastros);



module.exports = router;