module.exports =  class Algoritmo {
    edicoes;

    constructor(edicoes){
        this.edicoes = []
    }

    modificar(novaEdicao){

        let modificacao = false;
        for(let i = 0; i < this.edicoes.length; i++){
            if(this.edicoes[i].linha == novaEdicao.linha){
                this.edicoes[i].texto = novaEdicao.texto;
                this.edicoes[i].estudante = novaEdicao.estudante;
                modificacao = true;
                break;
            }
        }
       

        if(!modificacao){
            this.edicoes.push(novaEdicao)
        }
    }
}