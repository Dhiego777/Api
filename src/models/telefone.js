module.exports = class Telefone {
    constructor(telefone, user) {
      this.ddd = telefone.ddd
      this.telefone = telefone.numero
      this.id_user = user
    }
  }