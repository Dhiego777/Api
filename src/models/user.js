module.exports = class User {
    constructor(user) {
      this.cpf = user.cpf
      this.nome = user.nome
      this.idade = user.idade
      this.sexo = user.sexo
    }
}