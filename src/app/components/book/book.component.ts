import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Book } from 'src/app/interfaces/book.interface';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  bookService = inject(BookService);
  apollo = inject(Apollo);
  fb = inject(FormBuilder);
  book!: Book;
  id = 1;
  bookForm!: FormGroup;

  constructor() {
    this.getBookById();
  }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      isbn: new FormControl(''),
      name: new FormControl(''),
      author: new FormControl(''),
      published_at: new FormControl(''),
      review_rating: new FormControl(''),
    });
  }

  nextBook() {
    this.id++;
    this.getBookById();
  }

  previousBook() {
    if (this.id - 1 === 0) return;

    this.id--;

    this.getBookById();
  }

  getBookById() {
    this.apollo
      .watchQuery({
        query: this.bookService.getBookById,
        variables: {
          id: this.id,
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.book = data.Book;
        // this.error=error;
        console.log(error);
      });
  }

  createBook() {
    const { isbn, name, author, published_at, review_rating } =
      this.bookForm.value;

    this.apollo
      .mutate({
        mutation: this.bookService.createBook,
        variables: {
          isbn,
          name,
          author,
          published_at,
          review_rating: Number(review_rating),
        },
      })
      .subscribe(({ data, error }: any) => {
        this.book = data.Book;
        // this.error=error;
        console.log(error);
      });
  }
}
