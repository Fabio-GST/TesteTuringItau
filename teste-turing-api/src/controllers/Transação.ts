import { Request, Response } from 'express';
import { TransacaoModel } from '../models/Transação';
import { UsuarioModel } from '../models/Usuario';
import { badRequest, internalServerError, validateNumber, notFound } from '../services/util';

const CriarTransacao = async (req: Request, res: Response) => {
    const Transacao = req.body;
    const tipo = Transacao.tipo;

    if (!Transacao)
        return badRequest(res, "Sua transferência não foi completada pois requisição esta incorreta")

    if (Transacao.id_emissor === Transacao.id_receptor)
        return badRequest(res, "Sua transferência não foi completada pois Não é possivel fazer transferencia para a mesma conta")

    if (!validateNumber(Transacao.valor))
        return badRequest(res, "Sua transferência não foi completada pois o valor é invalido")

    switch (tipo) {
        case "PIX":
            if (Transacao.valor > 5000) {
                return badRequest(res, "Sua transferência não foi completada pois o valor ultrapassa o limite para este tipo de transferencia")
            }
            break;
        case "TED":
            if (Transacao.valor < 5000) {
                return badRequest(res, "Sua transferência não foi completada pois o valor não atinge o limite necessario para este tipo de transferencia")
            }
            if (Transacao.valor > 10000) {
                return badRequest(res, "Sua transferência não foi completada pois o valor ultrapassa o limite para este tipo de transferencia")
            }
            break;
        case "DOC":
            if (Transacao.valor < 10000) {
                return badRequest(res, "Sua transferência não foi completada pois o valor não atinge o limite necessario para este tipo de transferencia")
            }
            break;
        default:
            return badRequest(res, "Sua transferência não foi completada pois o Tipo de transferencia é invalida")
    }

    UsuarioModel.alterarSaldo(Transacao.id_emissor, Transacao.valor, "subtrair")
    UsuarioModel.alterarSaldo(Transacao.id_receptor, Transacao.valor, "adicionar")

    return TransacaoModel.CriarTransacao(Transacao)
        .then(usuario => {
            res.json(usuario)
        })
        .catch(err => internalServerError(res, err));
    
}
const listTransacoes = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if (!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return TransacaoModel.listTransacoes(id)
        .then((Transacao) => {
            if (Transacao)
                return res.json(Transacao);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const getExtrato = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if (!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return TransacaoModel.getExtrato(id)
        .then((Transacoes) => {
            if (Transacoes)
                return res.json(Transacoes);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

export const TransacaoController = {
    CriarTransacao,
    getExtrato,
    listTransacoes,
}