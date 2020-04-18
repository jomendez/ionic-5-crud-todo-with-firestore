import { Component, ViewChild } from '@angular/core';
import { FirestoreService } from '../firestore.service';

interface Todo {
  id: string;
  text: string;
  checked: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  messages: Todo[];
  model: Todo;
  isEditing: boolean = false;
  showForm: boolean;
  @ViewChild('slidingList', {static: false}) slidingList;

  constructor(private firestore: FirestoreService) {
    this.loadData();
    this.model = {
      id: '',
      text: '',
      checked: false
    }
  }

  loadData() {
    this.firestore.getAllDocuments("messages").subscribe((e) => {
      let arr: Todo[] = [];
      if (e && e.length > 0) {
        e.forEach(item => {
          const obj: Todo = item.payload.doc.data() as unknown as Todo;
          obj.id = item.payload.doc.id;
          arr.push(obj)
        });
      }

      this.messages = arr;
    });
  }

  toggleCheck(item): void {
    this.isEditing = true;
    item.checked = !item.checked;
    this.model = item;
    this.addMessage();
  }

  addMessage(): void {
    if (!this.model.text) {
      return;
    }
    if (!this.isEditing) {
      this.firestore.addDocument("messages", this.model).then(() => {
        this.loadData();//refresh view
      });
    } else {
      this.firestore.updateDocument("messages", this.model.id, this.model).then(() => {
        this.loadData();//refresh view
      });
    }
    this.isEditing = false;
    //clear form
    this.model.checked = false;
    this.model.text = '';
    this.showForm = false;
  }

  updateMessage(obj) {
    this.showForm = true;
    this.model = obj;
    this.isEditing = true;
    this.slidingList.closeSlidingItems();
  }

  deleteMessage(id: string) {
    this.slidingList.closeSlidingItems();
    this.firestore.deleteDocument("messages", id).then(() => {
      this.loadData();//refresh view
      this.isEditing = false;
    });
  }


  addItem(): void {
    this.slidingList.closeSlidingItems();
    this.showForm = !this.showForm;
  }

  trackByFn(index: number, item: any): number {
    return index; // or item.id
  }



}
