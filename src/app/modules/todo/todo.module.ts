import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoWidgetComponent } from './widgets/todo-widget/todo-widget.component';
import { FormsModule } from '@angular/forms';
import { EntityDataService } from '@ngrx/data';
import { TodoCustomDataService } from './store/entities/custom-entity-data-service.service';



@NgModule({
  declarations: [TodoWidgetComponent],
  exports: [TodoWidgetComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [TodoCustomDataService]
})
export class TodoModule {
  constructor(
    entityDataService: EntityDataService,
    todoCustomDataService: TodoCustomDataService,
  ) {
    entityDataService.registerService('Todo', todoCustomDataService); // <-- register it
  }
}
