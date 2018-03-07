import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom'

import { getCategories } from './categories/actions.js';
import { addPost, getPosts, getPostsPerCategory } from './posts/actions.js'
import Post from './posts/Post.js'
import EditPost from './posts/EditPost.js'
import AddPost from './posts/AddPost.js'

class App extends Component {

  componentWillMount(){
    this.props.getCategories()
    this.props.getPosts()
    console.log(this.props)
  }

  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <h1>Super Duper Topper App</h1>
          <span><strong>Filter posts by category: </strong></span>
          { this.props.categories.map((cat) => (
            <span>
              <Link to={`/${cat.name}`} key={cat.path}>{cat.name}</Link>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </span>
          ))}
          <Link to="/">show all</Link>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Link to="/add">
            <button>+ Add new post</button>
          </Link>
          <p></p>
          <Route
            exact path='/'
            render={ () => (
              <div>
                <h2> All Posts </h2>
                <hr/>
                {this.props.posts.allPosts &&
                  Object.entries(this.props.posts.allPosts).map(([postId, post]) =>
                  <Post post={post} key={postId} />
                )}
              </div>
            )}
          />
          <Route
            exact path='/:category'
            render={ ({match, history}) => (
              <div>
                <h2>{ match.params.category }</h2>
                <hr/>
                {this.props.posts.allPosts &&
                  Object.entries(this.props.posts.allPosts)
                    .filter(([postId, post]) => post.category === match.params.category)
                    .map(([postId, post]) =>
                    <Post post={post} key={postId} /> )
                }
              </div>
            )}
          />
          <Route
            path='/edit/:postId'
            render={({match, history}) => (
              <EditPost postId={match.params.postId} history={history} />
            )}
          />
          <Route
            path='/add'
            render={({history}) => (
              <AddPost history={history} />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }

}

// can have complex state transformations here
const mapStateToProps = ( {categories, posts} ) => ({
  categories,
  posts,
})

// can have more complex functions here
const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
  getPosts: () => dispatch(getPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
