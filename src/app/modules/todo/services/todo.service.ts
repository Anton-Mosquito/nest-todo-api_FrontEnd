import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BACKEND_BASE_DOMAIN } from 'src/env';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public entities$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private todoList: Todo[] = [];

  constructor(private httpClient: HttpClient) { }

  public getAll(): void {
    this.loading$.next(true);
    this.httpClient.get<Todo[]>(BACKEND_BASE_DOMAIN + 'todo').subscribe(todoList=>{
      this.todoList = todoList;
      this.entities$.next(this.todoList);
      this.loading$.next(false);
    })
  }

  public add(title: string): void {
    this.loading$.next(true);
      this.httpClient.post<Todo>(BACKEND_BASE_DOMAIN + 'todo', {
        title
      }).subscribe( todo =>{
        this.todoList?.push(todo);
        this.entities$.next(this.todoList);
        this.loading$.next(false);
      });
  }

  public update(todoOnCompleted: Todo): void {
    this.loading$.next(true);
    this.httpClient.patch<Todo>(`${BACKEND_BASE_DOMAIN}todo/${todoOnCompleted.id}`,
    {
      isComplited: !todoOnCompleted.isComplited
    }
  ).subscribe((updateTodo: Todo) =>{
    this.todoList = this.todoList?.map((todo)=> todo.id !== todoOnCompleted.id ? todo : updateTodo);
    this.entities$.next(this.todoList);
    this.loading$.next(false);
  });
  }

  public delete(id: number): void {
    this.loading$.next(true);
    this.httpClient.delete<void>(`${BACKEND_BASE_DOMAIN}todo/${id}`).subscribe(() =>{
      this.todoList = this.todoList?.filter(todo=> todo.id !== id);
      this.entities$.next(this.todoList);
      this.loading$.next(false);
    });
  }
}
