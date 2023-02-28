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
    let novoSaldo: number = -1;

    if (operacao === 'adicionar')
      novoSaldo = usuario.saldo + valor; 
    if (operacao === 'subtrair') 
      novoSaldo = usuario.saldo - valor;

    if (novoSaldo < 0) {
        return false
    }else{
        await dbQueryFirst(`UPDATE Usuario SET saldo = ? WHERE id = ?`, [novoSaldo, id]) as Usuario ;
        return true
    }


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