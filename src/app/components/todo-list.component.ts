import { Component } from '@angular/core';
import { toDoItem } from '../models/todoItem.model'

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-listener.component.html',
})
export class ToDOListComponent{
    todoList: toDoItem[] = []
}