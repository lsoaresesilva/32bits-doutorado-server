module.exports =  class Edicao {
    linha;
    estudante;
    texto;

    constructor(linha, texto, estudante){
        this.linha = linha;
        this.texto = texto;
        this.estudante = estudante;
    }
}