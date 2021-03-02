import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {delay} from 'rxjs/operators';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { TodoDataService } from '../../services/todoData.service';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.css']
})
export class TodoWidgetComponent implements OnInit {
  public title = "";
  public todoList$?: Observable<Todo[]>;
  public loading$?: Observable<boolean>;

  constructor(private todoServises: TodoDataService){}

  ngOnInit(): void {
    this.todoList$ = this.todoServises.entities$;
    this.loading$ = this.todoServises.loading$.pipe(delay(500));
    this.todoServises.getWithQuery({
      'limit': '10',
      'offset': '2'
    });
  }

  onCreate(): void {
    if (this.title) {
      this.todoServises.add({
        id: null,
        title : this.title,
        isComplited: false,
      });
      this.title = '';
    }
  }

  onRemove(todo: Todo): void {
    if (todo.id) {
      this.todoServises.delete(todo.id);
    }
  }

  onCompleted(todo: Todo): void {
    this.todoServises.update({
      ...todo,
      isComplited: !todo.isComplited
    });
  }
}
