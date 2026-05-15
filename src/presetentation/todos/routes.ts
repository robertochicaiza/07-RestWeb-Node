import { Router } from "express";
import { TodosController } from "./controller";


export class TodosRoutes{

    static get routes():Router{

        const router = Router();
        const todosController = new TodosController();

        //*Routes
        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodoById);
        router.get('/todootro', todosController.getTodoOtro);

        return router;


    }


}
