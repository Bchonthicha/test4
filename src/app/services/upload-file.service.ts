import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

import {FileUpload} from '../upload/fileupload';

@Injectable()
export class UploadFileService {

  constructor(private db: AngularFireDatabase) {}

  private basePath = '/Students';

  pushFileToStorage(fileUpload: FileUpload, progress: {percentage: number},keyS) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL
        fileUpload.name = fileUpload.file.name
        this.saveFileData(fileUpload,keyS)
      }
    );
  }

  private saveFileData(fileUpload: FileUpload,keyS) {
    this.db.object('/Students' + '/' + keyS).update(fileUpload);
  }


  //delete
  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.$key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name)
      })
      .catch(error => console.log(error))
  }
 
  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key)
  }
 
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref()
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}