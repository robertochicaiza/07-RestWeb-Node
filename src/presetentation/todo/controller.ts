import { Request, Response } from "express";
import { todo } from "node:test";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";




export class TodoController {

    //* Dependicias pára acceder a la capa de servicios o datos, por ejemplo:
    
    constructor() {

    }

    public getTodo = async (req: Request, res: Response) => {
      const todos = await prisma.todo.findMany();
        res.json(todos);

    }  

     public getTodoById = async(req: Request<{ id: string }>, res: Response) => {

            const id = +req.params.id;
            console.log('ID:', id);

            if(isNaN(id)) {
                res.status(400).json({ message: 'Invalid ID format' });
                return;
            }

            const todo = await prisma.todo.findUnique({
                where: { id }
            });

            (todo)  ? res.json(todo) : res.status(404).json({ message: `TODO with id ${id} not found` });
            res.end();

    }  

    


    public createTodo = async(req: Request, res: Response) => {
        
        //const { text} = req.body;
        
        // if (!text) {
        //     return res.status(400).json({ message: 'Text is required' });
        // }

        // const newTodo = await prisma.todo.create({
        //     data: {
        //         text,
        //     },
        // });

        //res.status(201).json(newTodo);

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const data: { text: string; completedAt?: Date | null } = {
            text: createTodoDto!.text,
        };

        if (createTodoDto!.completedAt !== null) {
            data.completedAt = createTodoDto!.completedAt;
        }

        const newTodo = await prisma.todo.create({
            data
        });
        res.status(201).json(newTodo);

    }

    public updateTodo = async (req: Request<{ id: string }>, res: Response) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id });

        if (error) {
            return res.status(400).json({ message: error });
        }
        const todo = await prisma.todo.findUnique({
            where: { id }
        });

        if (!todo) {
            res.status(404).json({ message: `TODO with id ${id} not found` });
            return;
        }   

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values
        });


        // const todo = await prisma.todo.findFirst({
        //     where: { id }
        // });

        // if (!todo) {
        //     res.status(404).json({ message: `TODO with id ${id} not found` });
        //     return;
        // }
         
        // const { text, completedAt } = req.body;
        

        // const updatedTodo = await prisma.todo.update({
        //     where: { id },
        //     data: { text, 
        //         completedAt: completedAt ? new Date(completedAt) : null
        //     }
        // });


        // res.json(updatedTodo);
        res.end();
    }

    public deleteTodo = async (req: Request<{ id: string }>, res: Response) => {

        const id = +req.params.id;  
        if(isNaN(id)) {
            res.status(400).json({ message: 'Invalid ID format' });
            return;
        }       

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if (!todo) {
            res.status(404).json({ message: `TODO with id ${id} not found` });
            return;
        }

        const deletedTodo = await prisma.todo.delete({
            where: { id }
        });

        (deletedTodo)
            ? res.json({ message: `TODO with id ${id} deleted successfully`, deletedTodo })
                : res.status(400).json({ message: `Failed to delete TODO with id ${id}` });

     


    };
}
