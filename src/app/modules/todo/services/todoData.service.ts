import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Todo } from '../models/todo';



@Injectable({ providedIn: 'root' })
export class TodoDataService extends EntityCollectionServiceBase<Todo> {
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Todo', elementsFactory);
  }
}
