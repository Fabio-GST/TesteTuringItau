import { Application , Router} from "express";
import { TransacaoRouter } from "./Transaçao";
import { UsuarioRouter } from "./Usuario";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/usuario', UsuarioRouter)
    apiRouter.use('/transacao', TransacaoRouter)
    
    app.use('/api/v1', apiRouter)
}