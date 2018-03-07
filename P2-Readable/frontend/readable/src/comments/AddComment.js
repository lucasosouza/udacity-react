import React, { Component } from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import uuidv5 from 'uuid'

// import * as dataAPI from '../dataAPI.'
import { addComment } from './actions.js'

class AddComment extends Component {

  render() {
    var  history, sendNewComment ;
    ({ history, sendNewComment } = this.props)
    console.log(this.props)
    return (
      <div>
        <form onSubmit={(event) => sendNewComment(this, event, history)}>
          <p>Author</p>
          <input name='author' ref={(inp) => this.author=inp}></input>
          <p>Body</p>
          <textarea name='body' ref={(inp) => this.body=inp}></textarea>
          <br/>
          <br/>
          <input type="submit" value="Add" />
        </form>
      </div>
    )
  }
}

// can have complex state transformations here
const mapStateToProps = ({ categories }) => ({
  categories,
})

// can have more complex functions here
const mapDispatchToProps = dispatch => ({
  sendNewComment: (form, event, history) => {
      event.preventDefault()
      const newComment = {
        id: uuidv5(),
        author: form.author.value,
        body: form.body.value,
        timestamp: Date.now()
      }
      dispatch(addComment(newComment))
      history.push('/')
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
