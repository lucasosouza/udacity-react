import React, { Component } from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';

// import * as dataAPI from '../dataAPI.'
import { getPost, editPost } from './actions.js'

class EditPost extends Component {

  componentWillMount(){
    this.props.getPost(this.props.postId)
  }

  render() {
    var history, sendEdit, post ;
    ({ history, sendEdit, post } = this.props)
    console.log(this.props)
    return (
      <div>
        {post &&
          <form onSubmit={(event) => sendEdit(this, event, history, post.id)}>
            <p>Title</p>
            <textarea name='title' defaultValue={post.title} ref={(input) => this.title=input}></textarea>
            <p>Body</p>
            <textarea name='body' defaultValue={post.body} ref={(input) => this.body=input}></textarea>
            <br/>
            <br/>
            <input type="submit" value="Save" />
          </form>
        }
      </div>
    )
  }
}

// can have complex state transformations here
const mapStateToProps = ({ posts }) => ({
  post: posts.selectedPost,
})

// can have more complex functions here
const mapDispatchToProps = dispatch => ({
  sendEdit: (form, event, history, postId) => {
      event.preventDefault()
      const title = form.title.value
      const body = form.body.value
      dispatch(editPost(postId, {title, body}))
      history.push('/')
  },
  getPost: (postId) => dispatch(getPost(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
