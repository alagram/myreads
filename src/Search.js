import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import DisplayBook from './DisplayBook';

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onAddBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    results: [],
    error: null
  }

  updateQuery = (query) => {
    this.setState(() => ({ query }))

    BooksAPI.search(query)
      .then( (results) => {

        if (query === this.state.query){
          if (typeof results !== 'undefined' && typeof results.length !== 'undefined') {
            results.forEach((result) => {
              this.props.books.forEach((book) => {
                if (book.id === result.id) {
                  result.shelf = book.shelf;
                }
              });
            });

            this.setState(() => ({
              results
            }))
          } else {
            this.setState(() =>
              ({
                results: []
              }));
          }
        }
      })
        .catch((error) => {
          this.setState(() => ({
            error: 'Books not found'
          }))
      });
  };

  render () {
    const { error, query, results } = this.state;
    const { onAddBook } = this.props;

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

        {error && (
          <div className="search-books-results">{error}</div>
          )}

        {results.length > 0 ? (
          <DisplayBook
            books={results}
            onChangeShelf={onAddBook}
          />
        ) : (<div className="search-books-results">No Search Results</div>)}

      </div>
    )
  }
}

export default Search
