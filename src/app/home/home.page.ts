import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  messages: any[];
  private db: AngularFirestore;
  model: any = {};
  isEditing: boolean = false;

  constructor(private fireStore: AngularFirestore) {
    this.db = this.fireStore;
    this.loadData();
  }

  loadData() {
    this.getAllDocuments("messages").subscribe((e) => {
      let arr = [];
      if (e && e.length > 0) {
        e.forEach(item => {
          const obj = item.payload.doc.data();
          obj.id = item.payload.doc.id;
          arr.push(obj)
        });
      }

      this.messages = arr;
    });
  }

  addMessage() {
    if (!this.isEditing) {
      this.addDocument("messages", this.model).then(() => {
        this.loadData();//refresh view
      });
    } else {
      this.updateDocument("messages", this.model.$key, this.model).then(() => {
        this.loadData();//refresh view
      });
    }
    this.isEditing = false;
    //clear form
    this.model.title = '';
    this.model.text = '';
  }

  updateMessage(obj) {
    this.model = obj;
    this.isEditing = true;
  }

  deleteMessage(id: string) {
    this.deleteDocument("messages", id).then(() => {
      this.loadData();//refresh view
      this.isEditing = false;
    });
  }





  //CRUD operation methods------------------------------------------------------------------------------------------

  getAllDocuments(collection: string): Observable<any> {
    return this.db.collection(collection).snapshotChanges();
  }

  deleteDocument(collectionName: string, docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionName)
        .doc(docID)
        .delete()
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  addDocument(collectionName: string, dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName).add(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  updateDocument(collectionName: string, docID: string, dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionName)
        .doc(docID)
        .update(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }


}
