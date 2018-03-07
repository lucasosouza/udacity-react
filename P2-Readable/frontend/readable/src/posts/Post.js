import React, { Component } from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import sortBy from 'sort-by'
import uuidv5 from 'uuid'
import ta from 'time-ago'

import { votePost, deletePost } from './actions.js'
import { getPostComments, addComment } from '../comments/actions.js'
import Comment from '../comments/Comment.js'
import AddComment from '../comments/AddComment.js'

class Post extends Component {

  state = {
    addComment:false
  }

  componentWillMount(){
    this.props.dispatch(getPostComments(this.props.post.id))
  }

  sendNewComment = (event) => {
    event.preventDefault()
    const newComment = {
      id: uuidv5(),
      author: this.author.value,
      body: this.body.value,
      timestamp: Date.now(),
      parentId: this.props.post.id
    }
    this.props.dispatch(addComment(newComment))
    this.setState({addComment: false})
  }

  render() {
    var post;
    ({ post } = this.props)
    console.log(this.props)
    return (
      <div>
        {post.deleted ||
          <div>
            <h4>{ post.title } &nbsp;&nbsp;&nbsp;&nbsp; <span class="small category">&lt; { post.category } &gt;</span></h4>
            <p className="body">{ post.body }</p>
            <p className="small">{ ta.ago(post.timestamp) }</p>
            <p className="small">By: { post.author }</p>
            <p className="small">Votes: { post.voteScore }</p>
            <p></p>
            <button onClick={() => this.props.dispatch(votePost(post.id, 'upVote'))}>Vote up </button>
            <button onClick={() => this.props.dispatch(votePost(post.id, 'downVote'))}> Vote down</button>
            <Link to={`/edit/${post.id}`}><button> Edit</button></Link>
            <button onClick={() => this.props.dispatch(deletePost(post.id))}> Delete</button>
            <br/>
            <h4>Comments</h4>
            { this.props.comments[post.id] &&
              this.props.comments[post.id].sort(sortBy('timestamp'))
                .sort()
                .map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            <p></p>
            <button className="commentsBox" onClick={() => this.setState({addComment: true})}>+ Add new comment</button>
            {this.state.addComment &&
              <div className="commentsBox">
                <form onSubmit={(event) => this.sendNewComment(event)}>
                  <p>Author</p>
                  <input name='author' ref={(inp) => this.author=inp}></input>
                  <p>Body</p>
                  <textarea name='body' ref={(inp) => this.body=inp}></textarea>
                  <br/>
                  <br/>
                  <input type="submit" value="Add" />
                </form>
              </div>
            }

            <hr/>
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

export default connect(mapStateToProps)(Post);
