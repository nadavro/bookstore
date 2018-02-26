import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import { Book } from '../models/book';
import { environment } from '../../environments/environment';



@Injectable()
export class DataService {
  
  currentBooks: Observable<Book[]>
  private _books: BehaviorSubject<Book[]>;
  private dataStore: {
    books: Book[]
  };
  constructor(private http: HttpClient) { 
    this.dataStore = { books: [] };
    this._books = <BehaviorSubject<Book[]>>new BehaviorSubject([]);
    this.currentBooks = this._books.asObservable();
  }
 
  loadfAll(){
    this.http.get<Book[]>(' http://localhost:8000/books/').subscribe(data => {
        this.dataStore.books = data;
        this._books.next(Object.assign({}, this.dataStore).books);
    }, error => {
        console.log(error);
    })
  }
  addBook(newBook: Book): any {
    var sub = this.http.post<Book>('http://localhost:8000/books/',newBook).share();
    sub.subscribe(data => {
      this.dataStore.books.push(data);
      this._books.next(Object.assign({}, this.dataStore).books);
    }, error => {
      console.log(error);
    })
    return sub;
  }
  getBook(id: number): Observable<Book> {
    return this.http.get<Book>('http://localhost:8000/books/'+id);
  }
  removeBook(id: number){
    this.http.delete<Book>('http://localhost:8000/books/'+id).subscribe(data => {
      var index = this.dataStore.books.findIndex(function(o){
        return o._id === id;
      })
      this.dataStore.books.splice(index,1);
      this._books.next(Object.assign({}, this.dataStore).books);
    }, error => {
      console.log(error);
    })
  }
}