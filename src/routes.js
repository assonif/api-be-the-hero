import { Router } from 'express';
import OngController from './controllers/OngController';
import IncidentController from './controllers/IncidentController';
import GeneralIncidentController from './controllers/GeneralIncidentController';
import SessionController from './controllers/SessionController';

import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

routes.get('/general-incidents', GeneralIncidentController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.use(authMiddleware);

export default routes;
