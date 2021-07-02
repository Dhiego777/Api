const User = require("../models/user/user");
const Endereco = require("../models/user/endereco")
const Telefone = require("../models/user/telefone");
const db = require("../database/db");
const knex = require("knex");

module.exports = {
    async getOne(req, res) {
        const { cpf } = req.query
        if (cpf) {
            let result = await db('user').where({ cpf }).first()
                .innerJoin('endereco', 'user.iduser', 'endereco.id_user')
                .innerJoin('telefone', 'user.iduser', 'telefone.id_user')
                .select('*');
            return res.status(200).send(result);
        }
        return res.status(404).send({});
    },
    async getAll(req, res) {
        let result = await db('user')
            .innerJoin('endereco', 'user.iduser', 'endereco.id_user')
            .innerJoin('telefone', 'user.iduser', 'telefone.id_user')
            .select("iduser", 'nome', 'sexo', 'cpf', 'idade', 'cep', 'logradouro', 'bairro', 'localidade', 'estado', 'numero', 'complemento', 'ddd', 'telefone');
        res.status(200).send(result);
    },
    create(req, res) {
        // console.log(Object.keys(req));
        db.transaction(async trx => {
            const user = await trx.insert(new User(req.body))
                .into('user')
                .catch(err => {
                    console.log("err", err)
                    trx.rollback()
                    return res.status(500).send({ msg: "Erro ao cadastrar" });
                });
            const endereco = await trx.insert(new Endereco(req.body.place, user))
                .into('endereco')
                .catch(err => {
                    console.log("err", err)
                    trx.rollback()
                    return res.status(500).send({ msg: "Erro ao cadastrar" });
                });
            const telefone = await trx.insert(new Telefone(req.body.telefone, user))
                .into('telefone')
                .then(trx.commit)
                .catch(err => {
                    console.log("err", err)
                    trx.rollback()
                    return res.status(500).send({ msg: "Erro ao cadastrar" });
                });
            res.status(200).send({ msg: "Cadastrado com sucesso" });
        })

    },
    async delete(req, res) {
        const { cpf } = req.query
        try {
            let result = await db('user').where({ cpf }).delete()
            if (result > 0) {

                return res.status(200).send({ msg: "Apagou o cadastro" })
            }
            return res.status(400).send({ msg: "Usuário não encontrado" })
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ msg: "Deu ruim" })
        }

    },
    async edit(req, res) {
        const { cpf } = req.body

        await db.transaction(async trx => {
            let user = await trx.update(new User(req.body))
                .into('user')
                .where({ cpf })
                .catch(err => {
                    console.log("err", err)
                    trx.rollback()
                    return res.status(500).send({ msg: "Erro ao atualizar" });
                });
            let place = await trx.update(new Endereco(req.body.place, req.body.place.id_user))
                .into('endereco')
                .where( { id_user:req.body.telefone.id_user } )
                .catch(err => {
                    console.log("err", err)
                    trx.rollback()
                    return res.status(500).send({ msg: "Erro ao atualizar" });
                });
            let telephone = await trx.update(new Telefone(req.body.telefone, req.body.telefone.id_user))
                .into('telefone')
                .where({ id_user:req.body.telefone.id_user })
                .catch(err => {
                    console.log("err", err)
                    trx.rollback()
                    return res.status(500).send({ msg: "Erro ao atualizar" });
                });
            await trx.commit()
            res.status(200).send({ msg: "Cadastro editado" });
        })
    }
};