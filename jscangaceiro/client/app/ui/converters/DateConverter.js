class DateConverter {

    constructor() {
        throw new DataInvalidaException();
    }

    static paraTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static paraData(texto) {
        if(!/\d{2}\/\d{2}\/\d{4}/.test(texto)) {
            throw new Error('Data deve estar no formato dd/mm/aaaa');
        }

        return new Date(...texto.split('/')
            .reverse()
            .map((item, indice) => item - indice % 2));
        
    }
}