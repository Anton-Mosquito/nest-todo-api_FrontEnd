import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { BACKEND_BASE_DOMAIN } from 'src/env';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.css']
})
export class TodoWidgetComponent implements OnInit {
  public title = "";
  public todoList?: Todo[];

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.httpClient.get<Todo[]>(BACKEND_BASE_DOMAIN + 'todo').subscribe(todoList=>{
      this.todoList = todoList;
    })
  }

  onCreate(): void {
    if (this.title) {
      this.httpClient.post<Todo>(BACKEND_BASE_DOMAIN + 'todo', {
        "title": this.title,
      }).subscribe( todo =>{
        this.todoList?.push(todo);

      });
      this.title = '';
    }
  }

  onRemove(todoOnDelete: Todo): void {
    this.httpClient.delete<void>(`${BACKEND_BASE_DOMAIN}todo/${todoOnDelete.id}`).subscribe(() =>{
      this.todoList = this.todoList?.filter(todo=> todo.id !== todoOnDelete.id)
    });
  }

  onCompleted(todoOnCompleted: Todo): void {
    this.httpClient.patch<Todo>(`${BACKEND_BASE_DOMAIN}todo/${todoOnCompleted.id}`,
      {
        isComplited: !todoOnCompleted.isComplited
      }
    ).subscribe((updateTodo: Todo) =>{
      this.todoList = this.todoList?.map((todo)=> todo.id !== todoOnCompleted.id ? todo : updateTodo)
    });
  }
}
