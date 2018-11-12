import { Injectable } from '@angular/core';
import { toDoList } from '../models/todolist.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class ToDoListService {

  private commonList: toDoList[];
  private postUpdSubject = new Subject<toDoList[]>();

  constructor(private http: HttpClient) {}

    getList() {
        this.http.get<toDoList[]>('http://localhost:3000/api/lists')
        .subscribe((serverList) => {
          this.commonList = serverList;
          this.emitSubjectEvent();
        });
    }

    addList(list: toDoList) {
        this.http.post<{message: string}>('http://localhost:3000/api/lists', list)
        .subscribe((data) => {
          this.commonList.unshift(list);
          this.emitSubjectEvent();
        });
    }

    delList(listId) {
        this.http.delete('http://localhost:3000/api/lists/' + listId)
        .subscribe(() => {
            this.commonList.splice(this.commonList.findIndex((list) => {
                return list._id === listId;
            }), 1);
            this.emitSubjectEvent();
        });
    }

    addListItem(listIndex, newItem) {
        this.commonList[listIndex].content.unshift({text: newItem, done: false});
        this.commonList[listIndex].lastupd = new Date;
        this.emitSubjectEvent();
    }

    delListItem(listIndex, contentIndex) {
        this.commonList[listIndex].content.splice(contentIndex, 1);
        this.commonList[listIndex].lastupd = new Date;
        this.emitSubjectEvent();
    }

    emitSubjectEvent() {
      this.postUpdSubject.next([...this.commonList]);
    }

    getListSubListener() {
      return this.postUpdSubject.asObservable();
    }
}
