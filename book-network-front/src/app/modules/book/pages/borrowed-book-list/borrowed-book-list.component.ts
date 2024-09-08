import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowedBookResponse, FeedbackRequest, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { empty } from 'rxjs';
import { BookService, FeedbackService } from '../../../../services/services';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from '../../components/rating/rating.component';

@Component({
  selector: 'app-borrowed-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingComponent],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit{

borrowedBooks: PageResponseBorrowedBookResponse = {};
feedbackRequest: FeedbackRequest = {
  bookId: 0,
  comments: '',
  note: 0
}
page: number = 0;
size: number = 5;
selectedBook: BorrowedBookResponse | undefined = undefined;

constructor(
  private bookService: BookService,
  private feedbackService: FeedbackService
){

}

ngOnInit(): void {
  this.findAllBorrowedBooks();
}
  
findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page: this.page, 
      size: this.size
    }).subscribe({
      next: (resp:PageResponseBorrowedBookResponse): void =>{
        this.borrowedBooks = resp;
      }
    })
}

gotToPage(page: number) {
  this.page = page;
  this.findAllBorrowedBooks();
}

goToFirstPage() {
  this.page = 0;
  this.findAllBorrowedBooks();
}

goToPreviousPage() {
  this.page --;
  this.findAllBorrowedBooks();
}

goToLastPage() {
  this.page = this.borrowedBooks.totalPages as number - 1;
  this.findAllBorrowedBooks();
}

goToNextPage() {
  this.page++;
  this.findAllBorrowedBooks();
}

get isLastPage() {
  return this.page === this.borrowedBooks.totalPages as number - 1;
}
  
returnBorrowedBook(book: BorrowedBookResponse) {
  this.selectedBook=book;
  this.feedbackRequest.bookId = book.id as number;
}

returnBook(withFeedback: boolean) {
  this.bookService.returnedBorrowedBook({
    'book-id': this.selectedBook?.id as number
  }).subscribe({
    next: () => {
      if (withFeedback) {
        this.giveFeedback();
      }
      this.selectedBook = undefined;
      this.findAllBorrowedBooks();
    }
  });
}

private giveFeedback() {
  this.feedbackService.saveFeedback({
    body: this.feedbackRequest
  }).subscribe({
    next: () => {
    }
  });
}

}
