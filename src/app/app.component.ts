import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title = "";
  public todoList?: Todo[];
  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.httpClient.get<Todo[]>('http://localhost:3000/rest/todo').subscribe(todoList=>{
      this.todoList = todoList;
    })
  }

  onCreate(): void {
    if (this.title) {
      this.httpClient.post<Todo>('http://localhost:3000/rest/todo', {
        "title": this.title,
      }).subscribe( todo =>{
        this.todoList?.push(todo);

      });
      this.title = '';
    }
  }

  onRemove(todoOnDelete: Todo): void {
    this.httpClient.delete<void>(`http://localhost:3000/rest/todo/${todoOnDelete.id}`).subscribe(() =>{
      this.todoList = this.todoList?.filter(todo=> todo.id !== todoOnDelete.id)
    });
  }

  onCompleted(todoOnCompleted: Todo): void {
    this.httpClient.patch<Todo>(`http://localhost:3000/rest/todo/${todoOnCompleted.id}`,
      {
        isComplited: !todoOnCompleted.isComplited
      }
    ).subscribe((updateTodo: Todo) =>{
      this.todoList = this.todoList?.map((todo)=> todo.id !== todoOnCompleted.id ? todo : updateTodo)
    });
  }
}
