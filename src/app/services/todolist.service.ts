import { Injectable } from '@angular/core';
import { toDoList } from '../models/todolist.model';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';

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
        this.http.post<{rspData: string}>('http://localhost:3000/api/lists', list)
        .subscribe((rspData) => {
                this.commonList.unshift(list);
                // this.emitSubjectEvent();
        });
    }

    delList(listIndex, listId) {
        this.http.delete('http://localhost:3000/api/lists/' + listId)
        .subscribe((rspData) => {
                this.commonList.splice(listIndex, 1);
                // this.emitSubjectEvent();
        });
    }

    addListItem(listIndex, listId, newItem) {
        this.http.put<{message: string}>('http://localhost:3000/api/items/' + listId, newItem)
        .subscribe((rspData) => {
                if (rspData.message === 'success') {
                    this.commonList[listIndex].content.unshift({_id: null, text: newItem, done: false});
                    this.commonList[listIndex].lastupd = new Date;
                }
        });
    }

    updListItem(listIndex, listId, contentIndex, updItem) {
        this.http.patch<{message: string}>('http://localhost:3000/api/items/' + listId, updItem)
        .subscribe((rspData) => {
                if (rspData.message === 'success') {
                    this.commonList[listIndex].content[contentIndex] = updItem;
                    this.commonList[listIndex].lastupd = new Date;
                }
        });
    }

    delListItem(listIndex, listId, contentIndex, contentId) {
        this.http.delete<{message: string}>('http://localhost:3000/api/items/' + listId + '/' + contentId)
        .subscribe((rspData) => {
                if (rspData.message === 'success') {
                    this.commonList[listIndex].content.splice(contentIndex, 1);
                    this.commonList[listIndex].lastupd = new Date;
                }
        });
    }

    emitSubjectEvent() {
      this.postUpdSubject.next(this.commonList);
    }

    getListSubListener() {
      return this.postUpdSubject.asObservable();
    }
}
