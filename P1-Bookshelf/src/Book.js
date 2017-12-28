import React from 'react'
import './App.css'

// stateless functional component

function Book(props) {

    const {book} = props

    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select onChange={(event) => props.changeShelf(book.id, event.target.value)} value={book.shelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          { book.authors.map((author) => <div key={author} className="book-authors">{author}</div>) }
        </div>
      </li>
    )

}

export default Book
