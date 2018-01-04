import React from 'react'
import './App.css'
import Shelf from './Shelf'
import {getAll, update, search} from './BooksAPI'
import BooksSearch from './BooksSearch.js'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component{

    state={
        books: [],
        booksInSearch: [],
        shelves: {'currentlyReading': 'Currently Reading',
                  'wantToRead': 'Want to Read',
                  'read': 'Reading'
                },
        showSearchPage: false
    }

    componentDidMount() {
      getAll().then((res) => {
        //console.log('res', res)
        this.setState({books: res})
      })
    }

    changeShelf = (bookId, newShelf) => {
      update(bookId, newShelf)
      this.setState((prevState) => (
        {books: prevState.books.map((b) => b.id === bookId ? (b.shelf = newShelf, b) : b)}
      ))
      console.log(this.state)
    }

    addToShelf = (bookId, newShelf) => {
      update(bookId, newShelf)
      this.setState((prevState) => {
        // check if book is already in local library
        if (prevState.books.filter((b)=> b.id === bookId).length>0) {
          return { books: prevState.books.map((b) => b.id === bookId ? (b.shelf = newShelf, b) : b) }
        // if not, add to it in the respective shelf selected
        } else {
          let bookToAdd = prevState.booksInSearch.filter((b) => b.id === bookId)[0]
          bookToAdd.shelf = newShelf
          return { books: prevState.books.concat(bookToAdd) }
        }
      })
    }

    queryBooks = (query) => {
      search(query).then((res) => {
        //error handling - unstable API, does not respond to all queries
        if (Array.isArray(res)) {
          this.setState({booksInSearch: res})
          //console.log(res)
        } else {
          console.log('Error in retrieving search: ', res.error)
        }
      })
    }

    render(){
      return (
        <div className="app">
          <Route
            path='/search'
            render={({ history }) => (
              <BooksSearch
                booksInSearch={this.state.booksInSearch}
                queryBooks={this.queryBooks}
                addToShelf={(bookId, newShelf) => {
                  this.addToShelf(bookId, newShelf)
                  history.push('/')
                }}
              />
            )}
          />
          <Route exact
            path='/'
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {Object.entries(this.state.shelves).map((shelf) => (
                      <Shelf
                        key={shelf[0]}
                        shelfName={shelf[1]}
                        books={this.state.books.filter((b) => b.shelf === shelf[0])}
                        changeShelf={this.changeShelf}
                      />
                    ))}
                  </div>
                </div>
                <div className="open-search">
                  <Link to='/search'>Add a book</Link>
                </div>
              </div>
            )}
          />
        </div>
      )
    }
}

export default BooksApp
