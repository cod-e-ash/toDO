import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { toDoList, toDoItem } from '../../models/todolist.model';
import { ToDoListService } from '../../services/todolist.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
// import { CdkDragDrop  } from '@angular/cdk/drag-drop';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy, AfterViewInit {

  colors: string[] = ['primary', 'info', 'success', 'danger', 'warning', 'info'];
  myList: toDoList[];
  wpend: boolean[] = [];
  curUser = '';
  newList: toDoList = {_id: null, user: '', title: '', content: [], lastupd: new Date};
  newListItem = '';
  newItem: string[] = [];
  curId: string;
  curIndex = -1;
  isLoading = false;
  private getListSub: Subscription;

  @ViewChild('newlistmodal') newListModal: ElementRef;

  constructor(public toDoListService: ToDoListService, public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    // Check if user logged in
    this.curUser = this.authService.getAuthUser();
    if (!this.curUser || this.curUser === '' ) {
      this.router.navigate(['login']);
      return;
    }
    this.toDoListService.getList();
    this.getListSub = this.toDoListService.getListSubListener()
    .subscribe((commonList: toDoList[]) => {
      // setTimeout(() => {
      // this.isLoading = false;
      // }, 2000);
      this.myList = commonList;
      this.sortContent(-1);
      this.isLoading = false;
    });
    this.newList._id = '';
    this.newList.title = '';
    this.newList.user = this.curUser;
  }

  ngOnDestroy() {
    try {
      this.getListSub.unsubscribe();
    } catch {}
  }

  sortContent(listIndex= -1) {
      if (listIndex < 0) {
          this.myList.forEach((list, index) => {
            this.mySort(index);
          });
      } else {
        this.mySort(listIndex);
      }
  }

  mySort(listIndex) {
    const newContent: toDoItem[] = [];
    this.myList[listIndex].content.reverse().forEach(item => {
      item.done ? newContent.push(item) : newContent.unshift(item);
    });
    this.myList[listIndex].content = newContent;
  }

  addItemInList(listIndex= -1, listId= '') {
    if (listIndex < 0) {
      if (this.newListItem.length > 0) {
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
    if (this.newListItem.length > 0) {
      this.addItemInList();
    }
    if (this.newList.title.length > 0 && this.newList.content.length > 0) {
      this.newList.user = this.curUser;
      this.toDoListService.addList(this.newList);
      this.newList = {_id: null, user: this.curUser, title: '', content: [], lastupd: new Date};
      jQuery(this.newListModal.nativeElement).modal('hide');
    }
  }

  newListReset() {
    this.newList = {_id: null, user: this.curUser, title: '', content: [], lastupd: new Date};
    jQuery(this.newListModal.nativeElement).modal('hide');
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

  ngAfterViewInit() {
  }


}
