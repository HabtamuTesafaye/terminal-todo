export class Todo{
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;    
  
    constructor(title: string, description: string, completed = false){
      this.title = title;
      this.description = description;
      this.completed = completed;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
}
