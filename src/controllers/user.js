const User = require("../models/user");
const Endereco = require("../models/endereco")
const Telefone = require("../models/telefone");
const db = require("../database/db");
const knex = require("knex");

module.exports = {
    async getOne(req, res) {
        const { cpf } = req.query
        if (cpf) {
            let result = await db('user').where({ cpf }).first()
                .innerJoin('endereco', 'user.iduser', 'endereco.id_user')
                .innerJoin('telefone', 'user.iduser', 'telefone.id_user')
                .select('nome', 'sexo', 'cpf', 'idade', 'cep', 'rua', 'bairro', 'cidade', 'estado', 'numero', 'complemento', 'ddd', 'telefone');
            return res.status(200).send(result);
        }
        return res.status(404).send({});
    },
    async getAll(req, res) {
        let result = await db('user')
            .innerJoin('endereco', 'user.iduser', 'endereco.id_user')
            .innerJoin('telefone', 'user.iduser', 'telefone.id_user')
            .select('nome', 'sexo', 'cpf', 'idade', 'cep', 'rua', 'bairro', 'cidade', 'estado', 'numero', 'complemento', 'ddd', 'telefone');
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
        try{
            let result = await db('user').where({ cpf }).delete()
            if(result > 0) {

                return res.status(200).send({ msg: "Apagou o cadastro"})
            }
            return res.status(400).send({ msg: "Usuário não encontrado"})
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({msg: "Deu ruim"})
        }

    },
    edit(req, res) {
        res.status(200).send("Cadastro editado");
    }
};

// edit(req, res) {
//     const { cpf } = req.body
    // db('user')
    //     .where({ cpf })
    //     .update(req.body)
    // res.status(200).send("Cadastro editado");

    // try {
    //     let result = db.transaction();
    //     try {
    //         db('user')
    //             .transacting(result)
    //             .insert({ id: "asdfk", username: "barry", email: "barry@bar.com" });
    //         db('user')
    //             .where('username', '=', 'bob')
    //             .update({ email: "bob@foo.com" });
    //         result.commit();
    //     }
    //     catch (e) {
    //         result.rollback();
    //         // As you can see, if you don't rethrow here// the outer catch is never triggeredthrow e;
    //     }
    //     // It worked
    // }
    // catch (e) {
    //     //It failed
    // }
// }
// };