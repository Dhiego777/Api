const User = require("../models/user");
const Endereco = require("../models/endereco")
const Telefone = require("../models/telefone");
const db = require("../database/db");
const knex = require("knex");

module.exports = {
    async getOne(req, res) {
        const { cpf } = req.query
        let result = await db('cliente').where({ cpf })
        res.status(200).send(result);
    },
    async getAll(req, res) {
        // esse cliente é da tabela do mysql
        let result = await db('cliente')
        .innerJoin('endereco', 'cliente.idcliente', 'endereco.id_cliente')
        .innerJoin('telefone', 'cliente.idcliente', 'telefone.id_cliente')
        .select('nome','sexo','cpf','idade','cep','rua','bairro','cidade','estado','ddd','numero');
        res.status(200).send(result);
    },
    create(req, res) {
        // console.log(Object.keys(req));
        new User(req.body);
        new Endereco(req.body.place)
        new Telefone(req.body.telefone)
        knex("telefone")
        .insert(new Telefone(req.body.telefone))
        console.log(User.cpf);
        res.status(200).send(req.body);
    },
    delete(req, res) {
        res.status(200).send("Apagou o Cadastro");
    },
    edit(req, res) {
        res.status(200).send("Cadastro editado");
    }
};