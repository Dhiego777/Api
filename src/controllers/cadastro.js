module.exports = {
    cliente(req, res){
        res.status(200).send({
            cpf: "43523573831",
            nome:"Dhiego",
            sexo:"Masculino",
            idade: 25,
            cep: "11075530",
            rua:"Rua Tiradentes",
            bairro:"Vila Belmiro",
            cidade:"Santos",
            numero:"24",
            complemento:"21",
            ddd:"013",
            telefone:"997017992"
        });
    },
    getCadastros(req, res){
        res.status(200).send("Pegou os Cadastros");
    },
    addCadastro(req, res){
        res.status(200).send("Cadastro Adicionado");
    },
    removeCadastro(req, res){
        res.status(200).send("Apagou o Cadastro");
    },
    editarCadastro(req, res){
        res.status(200).send("Cadastro editado");
    }
};