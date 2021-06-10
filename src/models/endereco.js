
module.exports = class Endereco {
  constructor(endereco, user) {
    this.cep = endereco.cep
    this.rua = endereco.logradouro
    this.bairro = endereco.bairro
    this.cidade = endereco.localidade
    this.estado = endereco.uf
    this.numero = endereco.numero
    this.complemento = endereco.complemento
    this.id_cliente = user
  }
}

//Esse é o certo do banco 
// constructor(endereco) {
//   this.cep = endereco.cep
//   this.rua = endereco.logradouro
//   this.bairro = endereco.bairro
//   this.cidade = endereco.localidade
//   this.estado = endereco.uf
//   this.numero = endereco.numero
//   this.complemento = endereco.complemento
//   this.id_cliente = user
// }