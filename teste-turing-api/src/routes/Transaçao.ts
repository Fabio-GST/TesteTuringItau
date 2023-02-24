import { Router} from 'express'
import { TransacaoController } from '../controllers/Transação';

const TransacaoRouter = Router();

TransacaoRouter.get('/:id', TransacaoController.listTransacoes);
TransacaoRouter.get('/extrato/:id', TransacaoController.getExtrato);
TransacaoRouter.post('/', TransacaoController.CriarTransacao);

export {
    TransacaoRouter
}