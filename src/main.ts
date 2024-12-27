import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TodoController } from './todo/todo.controller';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const todoController = app.get(TodoController);
  todoController.initCLI();
}
bootstrap();
