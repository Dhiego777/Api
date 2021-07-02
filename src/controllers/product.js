const Product = require("../models/product/product");
const db = require("../database/db");
const knex = require("knex");

module.exports = {
  async getOne(req, res) {
    const { idproduct } = req.query
    if (idproduct) {
      let result = await db('product').where({ idproduct }).first()
        .select('*');
      return res.status(200).send(result);
    }
    return res.status(404).send({});
  },
  async getAll(req, res) {
    let result = await db('product')
      .select('*');
    res.status(200).send(result);
  },
  async create(req, res) {
    const product = await db.insert(new Product(req.body))
      .into('product')
      .catch(err => {
        console.log("err", err)
        db.rollback()
        return res.status(500).send({ msg: "Erro ao cadastrar" });
      });
    res.status(200).send({ msg: "Cadastrado com sucesso" });
  },
  async delete(req, res) {
    const { idproduct } = req.query
    try {
      let result = await db('product').where({ idproduct }).delete()
      if (result > 0) {

        return res.status(200).send({ msg: "Apagou o produto" })
      }
      return res.status(400).send({ msg: "Produto não encontrado" })
    }
    catch (err) {
      console.error(err);
      return res.status(500).send({ msg: "Deu ruim" })
    }

  },
  async edit(req, res) {
    const { idproduct } = req.body

    let product = await db.update(new Product(req.body))
      .into('product')
      .where({ idproduct })
      .catch(err => {
        console.log("err", err)
        db.rollback()
        return res.status(500).send({ msg: "Erro ao atualizar" });
      });
    res.status(200).send({ msg: "Produto editado" });
  },
};