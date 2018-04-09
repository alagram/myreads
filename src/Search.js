import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import DisplayBook from './DisplayBook';

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onAddShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    results: []
  }

  updateQuery = (query) => {
    query = query.trim();

    BooksAPI.search(query)
      .then( (results) => {
        if (typeof results !== 'undefined' && typeof results.length !== 'undefined') {
          results.forEach((result) => {
            this.props.books.forEach((book) => {
              if (book.id === result.id) {
                result.shelf = book.shelf;
              }
            });
          });

          this.setState(() => ({
            results,
            query
          }))
        } else {
          this.setState(() => ({
            results: [],
            query
          }));
        }
      })
  };

  render () {
    const { query, results } = this.state;
    const { onAddShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
              />

          </div>
        </div>
        {results.length > 0 ? (
          <div className="search-books-results">
            <ol className="books-grid">
              {results && results.map( (book) => (
                <li key={book.id}>
                  <DisplayBook book={book} onChangeShelf={onAddShelf} />
                </li>
              ))}
            </ol>
          </div>
        ) : (<div className="search-books-results">No Search Results</div>)}

      </div>
    )
  }
}

export default Search
