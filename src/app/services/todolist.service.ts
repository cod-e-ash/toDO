import { Injectable } from '@angular/core';
import { toDoList, toDoItem } from '../models/todolist.model';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ToDoListService {

  private commonList: toDoList[];
  private postUpdSubject = new Subject<toDoList[]>();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

    getList() {
        this.http.get<toDoList[]>(this.apiUrl + '/lists')
        .subscribe((serverList) => {
            this.commonList = serverList;
            this.emitSubjectEvent();
        });
    }

    addList(list: toDoList) {
        this.http.post<{rspData: string}>(this.apiUrl + '/lists', list)
        .subscribe((rspData) => {
                this.commonList.unshift(list);
        });
    }

    delList(listIndex, listId) {
        this.http.delete(this.apiUrl + '/lists/' + listId)
        .subscribe((rspData) => {
                this.commonList.splice(listIndex, 1);
        });
    }

    addListItem(listIndex, listId, newItem) {
        const newItemText = {text: newItem};
        this.http.post<{message: string, newItem: toDoItem}>(this.apiUrl + '/items/' + listId, newItemText)
        .subscribe((rspData) => {
                if (rspData.message === 'success') {
                    this.commonList[listIndex].content.unshift(rspData.newItem);
                    this.commonList[listIndex].lastupd = new Date;
                }
        });
    }

    updListItem(listIndex, listId, contentIndex, updItem) {
        this.http.patch<{message: string}>(this.apiUrl + '/items/' + listId, updItem)
        .subscribe((rspData) => {
                if (rspData.message === 'success') {
                    this.commonList[listIndex].content[contentIndex] = updItem;
                    this.commonList[listIndex].lastupd = new Date;
                }
        });
    }

    delListItem(listIndex, listId, contentIndex, contentId) {
        this.http.delete<{message: string}>(this.apiUrl + '/items/' + listId + '/' + contentId)
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
