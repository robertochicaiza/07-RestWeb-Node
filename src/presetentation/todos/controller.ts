import { Request, Response } from "express";


const todos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
];


export class TodosController {

    //* Dependicias pára acceder a la capa de servicios o datos, por ejemplo:
    
    constructor() {

    }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
        res.end();
    }  

     public getTodoById = (req: Request<{ id: string }>, res: Response) => {

            const id = +req.params.id;
            console.log('ID:', id);

            if(isNaN(id)) {
                res.status(400).json({ message: 'Invalid ID format' });
                return;
            }

            const todo = todos.find(t => t.id === id);
            (todo)  ? res.json(todo) : res.status(404).json({ message: `TODO with id ${id} not found` });
            res.end();

    }  

    public getTodoOtro = (req: Request, res: Response) => {
        res.json([
            { id: 1, title: 'Todo 1 Otro', completed: false },
            { id: 2, title: 'Todo 2 Otro', completed: true },
            { id: 3, title: 'Todo 3 Otro', completed: false },
        ]);
        res.end();
    }  

}
