import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  getBookById = gql`
    query getBookById($id: ID!) {
      Book(id: $id) {
        id
        isbn
        name
        author
        published_at
        review_rating
      }
    }
  `;

createBook = gql`
mutation createBook($isbn: String!, $name: String!, $author: String!, $published_at: String!, $review_rating: Float!){
  createBook(isbn:$isbn, name:$name, author:$author, published_at:$published_at, review_rating:$review_rating){

    id
    isbn
    name
    author
    published_at
    review_rating
}

}
`

  constructor() {}
}
