import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private fireStore: AngularFirestore) { }

  //CRUD operation methods------------------------------------------------------------------------------------------

  getAllDocuments(collection: string): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireStore.collection(collection).snapshotChanges();
  }

  deleteDocument<T>(collectionName: string, docID: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fireStore
        .collection(collectionName)
        .doc(docID)
        .delete()
        .then(obj => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  addDocument<T>(collectionName: string, dataObj: T): Promise<DocumentReference> {
    return new Promise((resolve, reject) => {
      this.fireStore.collection(collectionName).add(dataObj)
        .then(obj => {
          resolve(obj);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  updateDocument<T>(collectionName: string, docID: string, dataObj: T): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fireStore
        .collection(collectionName)
        .doc(docID)
        .update(dataObj)
        .then(obj => {
          resolve(obj);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
