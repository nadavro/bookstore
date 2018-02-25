import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Book } from '../../models/book';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent implements OnInit {

  flag:boolean;
  title:string;
  description:string;
  author:string;
  genre:string;
  date:Date;
  isbn:number;
  price:number;
  
  

  constructor(private _dataService:DataService) { }

  ngOnInit() {
    this.flag = false;
  }
  OpenModal(){
    this.flag = !this.flag;;
  }
  checkFill(){
    return true;
  }
  closeModal(){
    this.flag = !this.flag;
  }
  onSubmit(f: NgForm) {
    console.log("called twice here");
    if (this.checkFill()){
      var newBook = <Book>{
        title:this.title,
        description:this.description,
        author:this.author,
        genre:this.genre,
        publication_date:this.date,
        isbn:this.isbn,
        price:this.price
      };
      this._dataService.addBook(newBook).subscribe(data =>{
        this.flag = !this.flag;
        f.resetForm();
      })
      

    }

    // f.resetForm();
}
  

}
