import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations'; 

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ]
})
export class BookComponent implements OnInit {

  errorMessage: any;
  currentBook:Book;
  constructor(private _dataService:DataService,private _route: ActivatedRoute,
    private _router: Router) { }

 
  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getBook(id);
    }
  }

  getBook(id: number) {
    this._dataService.getBook(id).subscribe(
      book => this.currentBook = book,
      error => this.errorMessage = <any>error);
  }

}
