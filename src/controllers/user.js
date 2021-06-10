const User = require("../models/user");
const Endereco = require("../models/endereco")
const Telefone = require("../models/telefone");
const db = require("../database/db");
const knex = require("knex");

module.exports = {
    async getOne(req, res) {
        const { cpf } = req.query
        if (cpf) {
            let result = await db('cliente').where({ cpf }).first()
            .innerJoin('endereco', 'cliente.idcliente', 'endereco.id_cliente')
            .innerJoin('telefone', 'cliente.idcliente', 'telefone.id_cliente')
            .select('nome', 'sexo', 'cpf', 'idade', 'cep', 'rua', 'bairro', 'cidade', 'estado', 'numero', 'complemento', 'ddd', 'telefone');
            return res.status(200).send(result);
        }
        return res.status(404).send({});
    },
    async getAll(req, res) {
        // esse cliente é da tabela do mysql
        let result = await db('cliente')
            .innerJoin('endereco', 'cliente.idcliente', 'endereco.id_cliente')
            .innerJoin('telefone', 'cliente.idcliente', 'telefone.id_cliente')
            .select('nome', 'sexo', 'cpf', 'idade', 'cep', 'rua', 'bairro', 'cidade', 'estado', 'numero', 'complemento', 'ddd', 'telefone');
        res.status(200).send(result);
    },
    async create(req, res) {
        // console.log(Object.keys(req));
        const user = await db('cliente').insert(new User(req.body));
        const endereco = await db('endereco').insert(new Endereco(req.body.place, user));
        const telefone = await db('telefone').insert(new Telefone(req.body.telefone, user));
        res.status(200).send(user);  
      
    },
    delete(req, res) {
        res.status(200).send("Apagou o Cadastro");
    },
    edit(req, res) {
        res.status(200).send("Cadastro editado");
    }
};