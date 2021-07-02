module.exports = class Product {
    constructor(product) {
      this.autorizacao = product.autorizacao
      this.classificacao = product.classificacao
      this.principio_ativo = product.principio_ativo
      this.classe_terapeutica = product.classe_terapeutica
      this.codigo_vigente = product.codigo_vigente
      this.descricao = product.descricao
      this.unidade = product.unidade
      this.fabricante = product.fabricante
      this.valor = product.valor
      this.quantidade = product.quantidade
    }
  }