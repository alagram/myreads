import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import DisplayBook from './DisplayBook';
import Search from './Search';
import SHELVES from './constant';

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({ books }));
      });
  }

  changeShelf = (book, newShelf) => {
    this.setState((prevState) => {
      book.shelf = newShelf
      return { books: prevState.books }
    })

    BooksAPI.update(book, newShelf);
  };

  addBook = (book, newShelf) => {
    this.setState((prevState) => {

      const newBooks = prevState.books.map((b) => (b.id) ).includes(book.id)
        ? prevState.books
        : prevState.books.concat([book])

      book.shelf = newShelf
      return {books: newBooks}
    })

    BooksAPI.update(book, newShelf);
  };

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search
            books={ books }
            onAddBook={this.addBook}
          />
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

              { Object.keys(SHELVES).map((shelf) => (
                <DisplayBook
                  key={shelf}
                  shelf={SHELVES[shelf][1]}
                  title={SHELVES[shelf][0]}
                  books={ books }
                  onChangeShelf={ this.changeShelf }
                />
              ))}

            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp;
