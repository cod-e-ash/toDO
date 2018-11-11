import { Injectable } from '@angular/core';
import { toDoList } from '../models/todolist.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ToDoListService{

  private commonList: toDoList[];
  private postUpdSubject = new Subject<toDoList[]>();

  constructor() {
        this.commonList= [{
            _id:'1',
            title: 'First Item',
            content: [{
              text: 'First Item in the List',
              status: false
            },{
              text: 'Second Item in the List',
              status: false
            },{
              text: 'Third Item in the List',
              status: false
            },{
              text: 'Fourth Item in the List',
              status: true
            },{
              text: 'Fifth Item in the List',
              status: false
            },{
              text: 'Sixth Item in the List',
              status: true
            }],
            lastupd: new Date()
          },{
            _id:'2',
            title: 'Second List',
            content: [{
              text: 'First Item in the List',
              status: false
            },{
              text: 'Second Item in the List',
              status: true
            },{
              text: 'Third Item in the List',
              status: true
            }],
            lastupd: new Date()
          },{
            _id:'3',
            title: 'Third Item',
            content: [{
              text: 'First Item in the List',
              status: false
            },{
              text: 'Second Item in the List',
              status: false
            },{
              text: 'Third Item in the List',
              status: false
            },{
              text: 'Fourth Item in the List',
              status: true
            },{
              text: 'Fifth Item in the List',
              status: false
            },{
              text: '7th Item in the List',
              status: true
            },{
              text: '8th Item in the List',
              status: true
            },{
              text: '9th Item in the List',
              status: false
            },{
              text: '10th Item in the List',
              status: true
            }],
            lastupd: new Date()
          },{
            _id:'4',
            title: 'First Item',
            content: [{
              text: 'First Item in the List',
              status: false
            },{
              text: 'Second Item in the List',
              status: false
            },{
              text: 'Third Item in the List',
              status: false
            },{
              text: 'Fourth Item in the List',
              status: true
            },{
              text: 'Fifth Item in the List',
              status: false
            },{
              text: 'Sixth Item in the List',
              status: true
            }],
            lastupd: new Date()
          },{
            _id:'6',
            title: 'Second List',
            content: [{
              text: 'First Item in the List',
              status: false
            },{
              text: 'Second Item in the List',
              status: true
            },{
              text: 'Third Item in the List',
              status: true
            }],
            lastupd: new Date()
          }];
    }
    


    getList(){
        return [...this.commonList];
    }

    addList(list: toDoList){
        this.commonList.unshift(list);
        this.emitSubject();
    }

    delList(index) {
        this.commonList.splice(index,1);
        this.emitSubject();
    }

    addListItem(index, newItem) {
        this.commonList[index].content.unshift({text: newItem, status: false});
        this.commonList[index].lastupd = new Date;
        this.emitSubject();
    }

    delListItem(listIndex, contentIndex) {
        this.commonList[listIndex].content.splice(contentIndex,1);
        this.commonList[listIndex].lastupd = new Date;
        this.emitSubject();
    }

    emitSubject() {
      this.postUpdSubject.next([...this.commonList]);
    }

    getListSubListener() {
      return this.postUpdSubject.asObservable();
    }
}