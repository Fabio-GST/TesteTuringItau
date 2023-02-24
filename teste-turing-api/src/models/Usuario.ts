import { dbQuery, dbQueryFirst } from "../services/db";

export type Usuario = {
    id: number;
    nome: string;
    login: string;
    senha: String;
    saldo: number; 
}

const CriarUsuario = async (usuario: Usuario) => {
    await dbQuery('INSERT INTO usuario (nome, login, senha, saldo) VALUES (?, ?, ?, ?)', [usuario.nome, usuario.login, usuario.senha, usuario.saldo])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'usuario'`)
    return retorno[0].id as number | undefined;
}

const getUsuario = async (id: Number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM usuario WHERE id = ?`, [id]);
    return retorno as Usuario ;
}

const updateUsuario = async (usuario: Usuario) => {
    await dbQuery(`UPDATE usuario SET nome = ?, login = ?  senha = ? saldo = ? WHERE id = ?`, [usuario.nome, usuario.login, usuario.senha, usuario.saldo , usuario.id])
    return getUsuario(usuario.id);
}

const listUsuarios = async () => {
    const retorno = await dbQuery(`SELECT * FROM usuario`);
    return retorno as Usuario[];
}

const deleteUsuario = async (id: number) => {
    await dbQueryFirst(`DELETE FROM usuario WHERE id = ?`, [id]);
}

const autenticarLogin = async(login:string, senha: string) =>{
    let retorno =  await dbQueryFirst(`SELECT * FROM usuario WHERE login = ? AND senha = ?`, [login, senha]);
    return retorno as Usuario[];
}

const alterarSaldo = async(id: number, valor: number, operacao: 'adicionar' | 'subtrair') =>{
    const usuario = await getUsuario(id);
    let novoSaldo: number;
  
    if (operacao === 'adicionar') {
      novoSaldo = usuario.saldo + valor; 
    } else {
      novoSaldo = usuario.saldo - valor;
    }
  
    if (novoSaldo < 0) {
        throw new Error('Operação inválida: saldo ficaria negativo.');
    }
    await dbQueryFirst(`UPDATE Usuario SET saldo = ? WHERE id = ?`, [novoSaldo, id]) as Usuario ;

}

export const UsuarioModel = {
    CriarUsuario,
    getUsuario,
    updateUsuario,
    deleteUsuario,
    listUsuarios,
    autenticarLogin,
    alterarSaldo

}