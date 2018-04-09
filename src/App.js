import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import DisplayBook from './DisplayBook'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
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
    const { books } = this.state

    const currentlyReading = books.filter( (book) => (book.shelf === 'currentlyReading'))
    const read = books.filter( (book) => (book.shelf === 'read'))
    const wantToRead = books.filter( (book) => (book.shelf === 'wantToRead'))

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
            <div className="list-books-content">
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {currentlyReading.map( (book) => (
                      <li key={book.id}>
                        <DisplayBook book={book} onChangeShelf={this.updateApi} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="list-books-content">
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {wantToRead.map( (book) => (
                      <li key={book.id}>
                        <DisplayBook book={book} onChangeShelf={this.updateApi} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="list-books-content">
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {read.map( (book) => (
                      <li key={book.id}>
                        <DisplayBook book={book} onChangeShelf={this.updateApi} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
