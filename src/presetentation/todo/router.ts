import { Router } from "express";
import { TodoController } from "./controller";


export class TodoRoutes{

    static get routes():Router{

        const router = Router();
        const todosController = new TodoController();

        //*Routes
        router.get('/', todosController.getTodo);
        router.get('/:id', todosController.getTodoById);
        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodo);

        return router;


    }


}
