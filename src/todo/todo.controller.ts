import { Command } from 'commander';
import { Injectable } from '@nestjs/common';
import { TodoService } from './todo.service';

@Injectable()
export class TodoController {

    constructor(private readonly todoService: TodoService) { }

    initCLI() {
        const program = new Command();

        program
            .name('todo')
            .version('1.0.0')
            .description('A simple todo app');


        program
            .command('add <title> <description>')
            .description('Add a new task')
            .action((title: string, description: string) => {
                const todo = this.todoService.add(title, description);
                console.log('Todo added:', todo);
            });

        program
            .command('list')
            .description('List all tasks')
            .action(() => {
                const todos = this.todoService.getAllTodos();

                if (todos.length === 0) {
                    console.log('No tasks found.');
                    return;
                }

                todos.forEach((todo) => {
                    const id = todo.id.toString().padEnd(8, ' ');
                    const title = todo.title.padEnd(15, ' ');
                    const description = todo.description.padEnd(25, ' ');
                    const completed = (todo.completed ? '✔' : '✖').padEnd(10, ' ');
                
                    console.log("Those are the tasks");
                    console.log(
                        `${id} | ${title} | ${description} | ${completed}`
                    );
                });
            });


        program
            .command('complete <id>')
            .description('Mark a task as completed')
            .action((id: string) => {
                if (this.todoService.markAsCompleted(parseInt(id))) {
                    console.log(`Task [${id}] marked as completed`);
                } else {
                    console.log(`Task [${id}] not found`);
                }
            });

        program
            .command('delete <id>')
            .description('Delete a task')
            .action((id: string) => {
                if (this.todoService.delete(parseInt(id))) {
                    console.log(`Task [${id}] deleted`);
                } else {
                    console.log(`Task [${id}] not found`);
                }
            });


        program
            .command('*')
            .action((cmd) => {
                console.error(`Command "${cmd}" not found.`);
                program.help(); // Display help information
            });

        program.parse(process.argv);
    }

}