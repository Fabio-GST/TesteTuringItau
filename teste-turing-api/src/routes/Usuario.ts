import { Router} from 'express'
import { UsuarioController } from '../controllers/Usuario';


const UsuarioRouter = Router();
UsuarioRouter.get('/', UsuarioController.listUsuarios);
UsuarioRouter.get('/:id', UsuarioController.getUsuario);
UsuarioRouter.post('/autenticar', UsuarioController.autenticarLogin);
UsuarioRouter.post('/', UsuarioController.CriarUsuario);
UsuarioRouter.delete('/:id', UsuarioController.deleteUsuario);
UsuarioRouter.post('/saldo', UsuarioController.alterarSaldo);
export {
    UsuarioRouter
}