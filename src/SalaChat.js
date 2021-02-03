module.exports =  class SalaChat {
    conexoes;
    salaId;

    constructor(salaId){
        this.conexoes = new Map();
        this.salaId = salaId;
    }

    /* inicializar(sala){
        if(this.conexoes.get(sala) == null){
            this.conexoes.set(sala, Map());
        }
    } */

    adicionarEstudante(estudante, socket){
        //  this.inicializar(sala);
        let estudanteCadastrado = this.conexoes.get(estudante.id);
        if(!estudanteCadastrado){
            this.conexoes.set(estudante.id, socket);
        }
        /* if(sala[estudante.id] == null){
            sala[estudante.id] = socket;
        } */
    }
/* 
    getEstudantesPorSala(sala){
        return this.conexoes.get(sala);
    } */

    enviarMensagem(mensagem, estudante){
        let msg = {texto:mensagem, estudante:estudante, tipo:"CHAT"};
        this.conexoes.forEach((estudante, key)=>{
            //let estudante = this.conexoes.get(key);
            if(estudante.send != undefined){
                estudante.send(JSON.stringify(msg));
            }
        })
        //let estudantes = this.getEstudantesPorSala(sala);
        /* if(estudantes != null){
            estudantes.keys.forEach(estudanteId => {
                if(estudantes[estudanteId].send != undefined){
                    estudantes[estudanteId].send(JSON.stringify(mensagem));
                }
                
            });
        } */

    }
}