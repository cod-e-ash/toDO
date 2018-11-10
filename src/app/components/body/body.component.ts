import { Component, OnInit } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgForm } from '@angular/forms';
import { last } from '@angular/router/src/utils/collection';

//import { toDoItemList } from '../../models/todoItem.model'
//import { toDoItem } from '../../models/todoItem.model'


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  public colors: string[] = ['primary','info','success','danger','warning','info'];
  public myList: any;
  public wpend: boolean[] = [];
  // public listContent: {text: string, status: boolean} = {};
  public newList = {title: '', content:[], lastupd:new Date};
  public newListItem: string = '';
  public newItem: string[] = [];

  constructor() { }

  ngOnInit() {
    this.myList = [{
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
    }]

    this.sortContent(-1);
    this.newList.title = '';
  }

  sortContent(listIndex=-1) {
      if (listIndex<0) {
        this.myList.forEach(list => {
          list.content.sort(function (x, y) {
              return (y.status === !x.status) ? 0 : x ? -1 : 1;
          });
        });
      } else {
        this.myList[listIndex].content.sort(function (x, y) {
          return (y.status === !x.status) ? 0 : x ? -1 : 1;
        });
      }  
  }

  getRandomColor(prefix: string) {
    return (prefix + this.colors[(Math.floor(Math.random() * 10)%6)]);
  }

  addItemToList(index=-1) {
    if (index<0) {
      if (this.newListItem.length > 0 && this.newList.title.length > 0) {
        this.newList.content.unshift({text: this.newListItem, status: false});
        this.newList.lastupd = new Date;
        this.newListItem = '';
      }
    } else {
      if (this.newItem[index].length > 0) {
        this.myList[index].content.unshift({text: this.newItem[index], status: false});
        this.myList[index].lastupd = new Date;
        this.newItem[index] = '';
      }
    }
    
  }

  delItemInList(listIndex, contentIndex) {
    if (listIndex<0) {
      this.newList.content.splice(contentIndex,1);
      this.newList.lastupd = new Date;
    } else {
      this.myList[listIndex].content.splice(contentIndex,1);
      this.myList[listIndex].lastupd = new Date;
    }
  }


  addList(){
    if(this.newList.title.length > 0 || this.newList.content.length > 0) {
      this.myList.unshift(this.newList);
      this.newList = {title: '', content:[], lastupd:new Date};
    }
  }

  delList(listIndex){
    this.myList.splice(listIndex,1);
  }

  
}
