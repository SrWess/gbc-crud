import { Router } from 'express';

import DoctorsController from '../controllers/DoctorsController';

const doctorsRouter = Router();

//Listagem e Busca
doctorsRouter.get('/', DoctorsController.index);

//Criação de um médico
doctorsRouter.post('/', DoctorsController.create);

//Alteração de alguma informação do médico
doctorsRouter.put('/:id', DoctorsController.update);

//Remoção do médico
doctorsRouter.delete('/:id', DoctorsController.delete);


export default doctorsRouter;
