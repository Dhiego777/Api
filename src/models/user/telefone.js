module.exports = class Telefone {
    constructor(telefone, user) {
      this.ddd = telefone.ddd
      this.telefone = telefone.telefone
      this.id_user = user
    }
  }