import React from 'react'
import './App.css'
import Book from './Book'


// stateless functional component

function Shelf(props) {

  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book)=>(
            <Book key={book.id} book={book} changeShelf={props.changeShelf} />
          ))}
        </ol>
      </div>
    </div>
  )

}

export default Shelf
