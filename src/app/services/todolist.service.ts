import { Injectable } from '@angular/core';
import { toDoList } from '../models/todolist.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ToDoListService {

  private commonList: toDoList[];
  private postUpdSubject = new Subject<toDoList[]>();
  private httpRespStatus = 0;

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
        this.http.delete('http://localhost:3000/api/lists/' + listId,  {observe: 'response'})
        .subscribe((message) => {
            if (message.status  !== 200 && message.status  !== 201 ) {
                // Remove list from common list
                this.commonList.splice(this.commonList.findIndex((list) => {
                    return list._id === listId;
                }), 1);
            }
            this.emitSubjectEvent();
        });
    }

    addListItem(listId, listIndex, newItem) {
        this.commonList[listIndex].content.unshift({_id: null, text: newItem, done: false});
        this.commonList[listIndex].lastupd = new Date;
        this.http.put('http://localhost:3000/api/lists/' + listId, this.commonList[listIndex], {observe: 'response'})
        .subscribe((message) => {
            if (message.status  !== 200 && message.status  !== 201 ) {
                this.commonList[listIndex].content.shift();
                this.httpRespStatus = message.status;
            }
        });
        this.emitSubjectEvent();
        if (this.httpRespStatus !== 200 && this.httpRespStatus !== 201) {
            return false;
        }
    }

    delListItem(listId, listIndex, contentIndex) {
        const oldList = this.commonList[listIndex];
        this.commonList[listIndex].content.splice(contentIndex, 1);
        this.commonList[listIndex].lastupd = new Date;
        this.http.put('http://localhost:3000/api/lists/' + listId, this.commonList[listIndex],  {observe: 'response'})
        .subscribe((message) => {
            if (message.status  !== 200 && message.status  !== 200) {
                this.commonList[listIndex] = oldList;
                this.httpRespStatus = message.status;
            }
        });
        this.emitSubjectEvent();
        if (this.httpRespStatus !== 200 && this.httpRespStatus !== 201) {
            return false;
        }
    }

    emitSubjectEvent() {
      this.postUpdSubject.next([...this.commonList]);
    }

    getListSubListener() {
      return this.postUpdSubject.asObservable();
    }
}
