import { dbQuery } from "../services/db";

export type Transacao = {
    id: number;
    tipo: string;
    id_emissor: number;
    id_receptor: number;
    valor: number; 
    data: Date
}

const CriarTransacao = async (Transacao: Transacao) => {
    const agora = new Date();
    const dataAtual = agora.toISOString();
    
    await dbQuery('INSERT INTO transacao (tipo, id_emissor, id_receptor, valor, data) VALUES (?, ?, ?, ?, ?)', [Transacao.tipo, Transacao.id_emissor, Transacao.id_receptor, Transacao.valor, dataAtual]);
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'transacao'`)
    return retorno[0].Id as number | undefined;
}

const getExtrato = async (id: Number) => {
    const retorno = await dbQuery(`SELECT * FROM transacao WHERE id_emissor = ? OR id_receptor = ?`, [id]);
    return retorno as Transacao[];
}

const listTransacoes = async (id: Number) => {
    const retorno = await dbQuery(`SELECT * FROM transacao WHERE id = ?`, [id]);
    return retorno as Transacao[];
}


export const TransacaoModel = {
    CriarTransacao,
    getExtrato,
    listTransacoes

}