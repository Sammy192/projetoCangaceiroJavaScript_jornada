import { HttpService } from '../../util/HttpService.js';
import { ApplicationException } from '../../util/ApplicationException.js';
import { Negociacao } from './Negociacao.js';

export class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    obtemNegociacoesDaSemana() {

        return this._http
            .get('http://localhost:3000/negociacoes/semana')
            .then(
            dados =>
                dados.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ,
            err => {

                throw new ApplicationException('Não foi possível obter as negociações da semana');
            }
            );
    }

    obtemNegociacoesDaSemanaAnterior() {

        return this._http
            .get('http://localhost:3000/negociacoes/anterior')
            .then(
            dados => dados.map(objeto =>
                new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ,
            err => {

                throw new ApplicationException('Não foi possível obter as negociações da semana anterior');
            }
            );
    }

    obtemNegociacoesDaSemanaRetrasada() {

        return this._http
            .get('http://localhost:3000/negociacoes/retrasada')
            .then(
            dados => dados.map(objeto =>
                new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ,
            err => {
                throw new ApplicationException('Não foi possível obter as negociações da semana retrasada');
            }
            );
    }

    async obtemNegociacoesDoPeriodo() {

        try {
            let periodo = await Promise.all([
                this.obtemNegociacoesDaSemana(),
                this.obtemNegociacoesDaSemanaAnterior(),
                this.obtemNegociacoesDaSemanaRetrasada()
            ]);
            return periodo
                .reduce((novoArray, item) => novoArray.concat(item), [])
                .sort((a, b) => b.data.getTime() - a.data.getTime());

        } catch (err) {
            console.log(err);
            throw new ApplicationException('Não foi possível obter as negociações do período')
        };
    }
}