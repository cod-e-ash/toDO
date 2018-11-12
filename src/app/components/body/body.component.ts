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

  private colors: string[] = ['primary', 'info', 'success', 'danger', 'warning', 'info'];
  private myList: toDoList[];
  private wpend: boolean[] = [];
  private newList: toDoList = {_id: '', user: '', title: '', content: [], lastupd: new Date};
  private newListItem = '';
  private newItem: string[] = [];
  private getListSub: Subscription;
  private curId: string;


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

  addItemToList(index= -1) {
    if (index < 0) {
      if (this.newListItem.length > 0 && this.newList.title.length > 0) {
        this.newList.content.unshift({text: this.newListItem, done: false});
        this.newList.lastupd = new Date;
        this.newListItem = '';
      }
    } else {
      if (this.newItem[index].length > 0) {
        this.toDoListService.addListItem(index, this.newItem[index]);
        this.newItem[index] = '';
      }
    }

  }

  delItemInList(listIndex, contentIndex) {
    console.log(listIndex, contentIndex);
    if (listIndex < 0) {
      this.newList.content.splice(contentIndex, 1);
      this.newList.lastupd = new Date;
    } else {
      this.toDoListService.delListItem(listIndex, contentIndex);
    }
  }

  addList() {
    if (this.newList.title.length > 0 && this.newList.content.length > 0) {
      this.newList.user = 'ashish';
      this.toDoListService.addList(this.newList);
      this.newList = {_id: '', user: '', title: '', content: [], lastupd: new Date};
    }
  }

  delList() {
    this.toDoListService.delList(this.curId);
  }
}
