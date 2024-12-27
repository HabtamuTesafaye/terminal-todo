import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { FileManager } from '../utils/file-manager';

@Injectable()
export class TodoService {
  private fileManager: FileManager<Todo>;
  private todos: Todo[] = [];
  private idCounter = 0;

  constructor() {
    this.fileManager = new FileManager<Todo>('todos.json') ;
    this.loadTodos();
  }

  private loadTodos(): void {
    this.todos = this.fileManager.load();
    this.idCounter = this.todos.length > 0 ? Math.max(...this.todos.map((t) => t.id)) + 1 : 0;
  }
  

  private saveTodos(): void {
    this.fileManager.save(this.todos);
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  add(title: string, description: string): Todo {
    const todo = new Todo(title, description);
    todo.id = this.idCounter++;
    this.todos.push(todo);
    this.saveTodos(); // Save changes to the file
    return todo;
  }

  markAsCompleted(id: number): boolean {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = true;
      todo.updatedAt = new Date();
      this.saveTodos(); // Save changes to the file
      return true;
    }
    return false;
  }

  delete(id: number): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.saveTodos(); // Save changes to the file
      return true;
    }
    return false;
  }
}
