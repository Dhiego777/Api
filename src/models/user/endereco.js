
module.exports = class Endereco {
  constructor(endereco, user) {
    this.cep = endereco.cep
    this.logradouro = endereco.logradouro
    this.bairro = endereco.bairro
    this.localidade = endereco.localidade
    this.estado = endereco.uf
    this.numero = endereco.numero
    this.complemento = endereco.complemento
    this.id_user = user
  }
}