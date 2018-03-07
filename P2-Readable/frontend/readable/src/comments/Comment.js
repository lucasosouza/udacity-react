import React, { Component } from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';

import { voteComment, deleteComment, editComment } from './actions.js'
import ta from 'time-ago'

class Comment extends Component {

  state = {
    editComment: false,
  }

  sendEdit = (form, event, commentId) => {
      event.preventDefault()
      this.props.dispatch(editComment(commentId, {body: form.body.value}))
      this.setState({editComment: false})
  }

  render() {
    var comment;
    ({ comment } = this.props)
    console.log(this.props)
    return (
      <div>
        {(!comment.deleted && !this.state.editComment) &&
          <div className="commentsBox">
            <p className="body small">{ comment.body }</p>
            <p className="smaller">{ ta.ago(comment.timestamp) }</p>
            <p className="smaller">By: { comment.author }</p>
            <p className="smaller">Votes: { comment.voteScore }</p>
            <p></p>
            <button onClick={() => this.props.dispatch(voteComment(comment.id, 'upVote'))}>Vote up </button>
            <button onClick={() => this.props.dispatch(voteComment(comment.id, 'downVote'))}> Vote down</button>
            <button onClick={() => this.setState({editComment: true})}> Edit</button>
            <button onClick={() => this.props.dispatch(deleteComment(comment.id))}> Delete</button>
            <br/>
          </div>
        }
        {(!comment.deleted && this.state.editComment) &&
          <div className="commentsBox">
            <form onSubmit={(event) => this.sendEdit(this, event, comment.id)}>
              <textarea name='title' defaultValue={comment.body} ref={(inp) => this.body=inp}></textarea>
              <p className="smaller">{ comment.timestamp }</p>
              <p className="smaller">By: { comment.author }</p>
              <p className="smaller">Votes: { comment.voteScore }</p>
              <p></p>
              <input type="submit" value="Save" />
              <br/>
            </form>
          </div>
        }
      </div>
    )
  }
}

// can have complex state transformations here
const mapStateToProps = ( {categories, comments} ) => ({
  categories,
  comments
})

export default connect(mapStateToProps)(Comment);
