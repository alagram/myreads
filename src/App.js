import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import DisplayBook from './DisplayBook';
import Search from './Search';

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

  updateApi = (book, shelf) => BooksAPI.update(book, shelf);

  updateShelf = (book, shelf) => {
    this.setState((prevState) => {
      book.shelf = shelf;
      prevState.books.push(book);
    });
    this.updateApi(book, shelf);
  };

  render() {
    const { books } = this.state;

    const shelves = {
      currentlyReading: ['Currently Reading', 'currentlyReading'],
      wantToRead: ['Want to Read', 'wantToRead'],
      read: ['Read', 'read']
    }

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search
            books={books}
            onAddShelf={this.updateShelf}
          />
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

              { Object.keys(shelves).map((shelf) => (
                <DisplayBook
                  key={shelf}
                  shelf={shelves[shelf][1]}
                  title={shelves[shelf][0]}
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
