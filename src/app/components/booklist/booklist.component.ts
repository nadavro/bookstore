import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations'; 

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ]
})
export class BooklistComponent implements OnInit {
  books:Book[];
  constructor(private _dataService:DataService,private router:Router) { }

  ngOnInit() {
    this._dataService.currentBooks.subscribe(books => {
      this.books = books;
    })
    this._dataService.loadfAll();
  }
  
  navigateToBook(id){
    this.router.navigate(['/books/'+id]);
  }
  removeBook(id){
    this._dataService.removeBook(id);
  }

}
