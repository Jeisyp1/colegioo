import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private usersCollection: AngularFirestoreCollection<any>;
  private alumnosCollection: AngularFirestoreCollection<any>;
  private listoSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  listo$: Observable<boolean> = this.listoSubject.asObservable();
  private llegueSubject = new Subject<void>();
  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection('usuarios');
    this.alumnosCollection = this.firestore.collection('alumnos');
    
  }

  setListo(value: boolean): void {
    this.listoSubject.next(value);
  }


  addUser(user: any): Promise<void> {
    return this.usersCollection.doc(user.id).set(user);
  }

  getUsers(): Observable<any[]> {
    return this.usersCollection.valueChanges({ idField: 'id' });
  }

  getUserById(userId: string): Observable<any> {
    return this.usersCollection.doc(userId).valueChanges();
  }

  updateUser(userId: string, newData: any): Promise<void> {
    return this.usersCollection.doc(userId).update(newData);
  }

  deleteUser(userId: string): Promise<void> {
    return this.usersCollection.doc(userId).delete();
  }


  // Métodos para alumnos
  addAlumno(alumno: any): Promise<DocumentReference<any>> {
    return this.alumnosCollection.add(alumno);
  }  

  getAlumnos(): Observable<any[]> {
    return this.alumnosCollection.valueChanges({ idField: 'id' });
  }

  deleteAlumno(alumnoId: string): Promise<void> {
    return this.alumnosCollection.doc(alumnoId).delete();
  }

  updateAlumno(alumnoId: string, newData: any): Promise<void> {
    return this.alumnosCollection.doc(alumnoId).update(newData);
  }


  llegue(): void {
    this.llegueSubject.next();
  }

  llegue$(): Observable<void> {
    return this.llegueSubject.asObservable();
  }
}
