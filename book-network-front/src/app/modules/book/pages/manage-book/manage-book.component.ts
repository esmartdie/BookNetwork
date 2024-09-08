import { Component, OnInit } from '@angular/core';
import { BookRequest, BookResponse } from '../../../../services/models';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../../services/services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit {

  errorMsg: Array<string> = [];
  selectedPicture: string | undefined;
  selectedBookCover: any;
  bookRequest: BookRequest = {authorName: '', isbn: '', synopsis:'', title: ''}

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
   ){
  
   }
  
  onFileSelected(event: any):void {
    this.selectedBookCover = event.target.files[0];
    console.log(this.selectedBookCover);
    if (this.selectedBookCover){
      const reader: FileReader = new FileReader();
      reader.onload = (): void => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook(): void {
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId: number):void =>{
        this.bookService.uploadBookCoverPicture({
          'book-id': bookId, 
          body:{
            file: this.selectedBookCover
          }
        }).subscribe({
          next: () =>{
            this.router.navigate(['/books/my-books'])
          }
        })
      },
      error: (err): void =>{
        this.errorMsg = err.error.validationErrors;
      }
    });
  }

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if(bookId){
      this.bookService.findBookById({
        'book-id': bookId
      }).subscribe({
        next:(book:BookResponse):void =>{
          this.bookRequest ={
            id: book.id, 
            title: book.title as string, 
            authorName: book.authorName as string, 
            isbn: book.isbn as string, 
            synopsis: book.synopsis as string, 
            shareable: book.shareable
          }
          if(book.cover){
            this.selectedPicture = 'data:image/jpg;base64, ' + book.cover
          }
        }
      })
    }
  }



}
