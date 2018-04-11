import React from 'react';
import PropTypes from 'prop-types';

function DisplayBook ({ shelf, title, books, onChangeShelf })  {

  return (
    <div className="list-books-content">
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.filter( (book) => book.shelf === shelf).map((book) => (
                  <li key={book.id}>
                    <div  className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks ? `url(${book.imageLinks.thumbnail})` : "") }}></div>
                        <div className="book-shelf-changer">
                          <select value={book.shelf ? book.shelf : 'none'} onChange={ (e) => onChangeShelf(book, e.target.value) }>
                            <option value="moveTo" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors ? book.authors.join(', ') : ""}</div>
                    </div>
                  </li>


                ))}
              </ol>
            </div>
          </div>
        </div>
    </div>
  )
}

DisplayBook.propTypes = {
  shelf: PropTypes.string,
  title: PropTypes.string,
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

DisplayBook.defaultProps = {
  shelf: '',
  title: ''
}

export default DisplayBook;
