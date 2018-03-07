import React, { Component } from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';

import { editPost } from './actions.js'

class Post extends Component {

  render() {
    var sendEdit, post;
    ({ sendEdit, post } = this.props)
    return (
      <div>
        <Route exact
          path='/'
          render= {() =>
            {post.deleted ||
              <div>
                <h3>{ post.title }</h3>
                <p>{ post.body }</p>
                <p>Author: { post.author }</p>
                <p>Votes: { post.voteScore }</p>
                <br/>
                <Link to={`/edit-post/${post.id}`} />
              </div>
            }
          }
        />
        <Route exact
          path={`/edit/${post.id}`}
          render= {(h) => (
            <form>
              <input value={post.title}></input>
              <input value={post.body}></input>
              <button onClick={(e) => sendEdit(e, h, post.id)}></button>
            </form>
          )}
        />
        <p>Default view: {post.id}</p>
      </div>
    )
  }
}

// can have complex state transformations here
const mapStateToProps = ( {categories} ) => ({
  categories,
})

// can have more complex functions here
const mapDispatchToProps = dispatch => ({
  sendEdit: (event, history, postId) => {
      event.preventDefault()
      editPost(postId, JSON.serialize(event.target.value))
      history.push('/')
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);
