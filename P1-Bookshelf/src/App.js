import React from 'react'
import './App.css'
import Shelf from './Shelf'
import Book from './Book'
import {getAll, update, search} from './BooksAPI'

class BooksApp extends React.Component{

    state={
        books: [],
        booksInSearch: [],
        shelves: {'currentlyReading': 'Currently Reading',
                  'wantToRead': 'Want to Read',
                  'read': 'Reading'
                },
        showSearchPage: false,
        query: ''
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
      this.setState({query: query})
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
            {this.state.showSearchPage ? (
                <div className="search-books">
                  <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                    <div className="search-books-input-wrapper">
                      {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                      */}
                      <input type="text" placeholder="Search by title or author"
                        value={this.state.query} onChange={(event) => this.queryBooks(event.target.value)}/>

                    </div>
                  </div>
                  <div className="search-books-results">
                    <ol className="books-grid">
                      {this.state.booksInSearch.map((book) => (
                        <Book key={book.id} book={book} changeShelf={this.addToShelf}/>
                      ))}
                    </ol>
                  </div>
                </div>
              ) : (
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
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                  </div>
                </div>
                )}
              </div>
          )}
}

export default BooksApp
