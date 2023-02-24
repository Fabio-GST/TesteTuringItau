import { Request, Response } from 'express';
import { Usuario, UsuarioModel } from '../models/Usuario';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';

function CriarUsuario (req: Request, res: Response) {

    const usuario = req.body as Usuario;
    const regexSenha = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!usuario)
        return badRequest(res, "Cadastro invalido");
    if (!regexSenha.test(usuario.senha.toString()))
        return badRequest(res, "Senha invalida " + usuario.senha);
    return UsuarioModel.CriarUsuario(usuario)

}

const listUsuarios = ({ }: Request, res: Response) => {
    UsuarioModel.listUsuarios()
        .then(Usuarios => {
            res.json(Usuarios)
        })
        .catch(err => internalServerError(res, err));
}

const getUsuario = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if (!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return UsuarioModel.getUsuario(id)
        .then((Usuario) => {
            if (Usuario)
                return res.json(Usuario);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteUsuario = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if (!validateNumber(id))
            return badRequest(res, 'id inválido');

        const UsuarioSaved = await UsuarioModel.getUsuario(id);
        if (!UsuarioSaved)
            return notFound(res);
    }

    return UsuarioModel.deleteUsuario(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}


const autenticarLogin = (req: Request, res: Response) => {
    const login = req.body.login;
    const senha = req.body.senha;

    UsuarioModel.autenticarLogin(login, senha)
        .then((Usuario) => {
            if (Usuario)
                return res.json(Usuario);
            else
                return badRequest(res, "Usuario ou senha invalida");
        })
        .catch(err => internalServerError(res, err));
}

const alterarSaldo = (req: Request, res: Response) => {
    
    const id = parseInt(req.body.id);
    const valor = parseFloat(req.body.valor);
    const operacao = req.body.operacao;

    if (!validateNumber(id))
        return badRequest(res, 'id inválido');

    if (!validateNumber(valor))
        return badRequest(res, 'Valor inválido');

    return UsuarioModel.alterarSaldo(id, valor, operacao)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));

}


export const UsuarioController = {
    CriarUsuario,
    getUsuario,
    deleteUsuario,
    listUsuarios,
    autenticarLogin,
    alterarSaldo
}