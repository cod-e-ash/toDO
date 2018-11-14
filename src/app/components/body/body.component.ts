import { Component, OnInit, OnDestroy } from '@angular/core';
import { toDoList } from '../../models/todolist.model';
import { ToDoListService } from '../../services/todolist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {

  colors: string[] = ['primary', 'info', 'success', 'danger', 'warning', 'info'];
  myList: toDoList[];
  wpend: boolean[] = [];
  newList: toDoList = {_id: null, user: '', title: '', content: [], lastupd: new Date};
  newListItem = '';
  newItem: string[] = [];
  curId: string;
  curIndex = -1;
  private getListSub: Subscription;

  constructor(public toDoListService: ToDoListService) { }

  ngOnInit() {
    this.toDoListService.getList();
    this.getListSub = this.toDoListService.getListSubListener()
      .subscribe((commonList: toDoList[]) => {
        this.myList = commonList;
        this.sortContent(-1);
      });
    this.newList._id = '';
    this.newList.title = '';
  }

  ngOnDestroy() {
    this.getListSub.unsubscribe();
  }

  sortContent(listIndex= -1) {
      if (listIndex < 0) {
        this.myList.forEach(list => {
          list.content.sort(function (x, y) {
              return (y.done === !x.done) ? 0 : x ? -1 : 1;
          });
        });
      } else {
        this.myList[listIndex].content.sort(function (x, y) {
          return (y.done === !x.done) ? 0 : x ? -1 : 1;
        });
      }
  }

  addItemInList(listIndex= -1, listId= '') {
    if (listIndex < 0) {
      if (this.newListItem.length > 0 && this.newList.title.length > 0) {
        this.newList.content.unshift({_id: null, text: this.newListItem, done: false});
        this.newList.lastupd = new Date;
        this.newListItem = '';
      }
    } else {
      if (this.newItem[listIndex] && this.newItem[listIndex].length > -1) {
        this.toDoListService.addListItem(listIndex, listId, this.newItem[listIndex]);
        this.newItem[listIndex] = '';
      }
    }
  }

  updItemInList(listIndex= -1, listId= '', contentIndex) {
    if (listIndex > -1) {
        this.toDoListService.updListItem(listIndex, listId, contentIndex, this.myList[listIndex].content[contentIndex]);
      }
  }

  delItemInList(listIndex, listId, contentIndex) {
    if (listIndex < 0) {
      this.newList.content.splice(contentIndex, 1);
      this.newList.lastupd = new Date;
    } else {
      this.toDoListService.delListItem(listIndex, listId, contentIndex, this.myList[listIndex].content[contentIndex]._id);
    }
  }

  addList() {
    if (this.newList.title.length > 0 && this.newList.content.length > 0) {
      this.newList.user = 'ashish';
      this.toDoListService.addList(this.newList);
      this.newList = {_id: null, user: '', title: '', content: [], lastupd: new Date};
    }
  }

  newListReset() {
    this.newList = {_id: null, user: '', title: '', content: [], lastupd: new Date};
  }

  setCurItem(listIndex, listId) {
    this.curIndex = listIndex;
    this.curId = listId;
  }

  delList() {
    this.toDoListService.delList(this.curIndex, this.curId);
    this.curIndex = -1;
    this.curId = '';
  }
}
