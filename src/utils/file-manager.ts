import * as fs from 'fs';
import * as path from 'path';

export class FileManager<T> {
  private filePath: string;

  constructor(filename: string) {
    this.filePath = path.resolve(__dirname, '../../data', filename);

    // Ensure the directory exists
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Ensure the file exists
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '[]');
    }
  }

  load(): T[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data) as T[];
  }

  save(data: T[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }
}
