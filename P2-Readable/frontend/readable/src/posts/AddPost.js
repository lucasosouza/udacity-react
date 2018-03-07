import React, { Component } from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';

// import * as dataAPI from '../dataAPI.'
import { addPost } from './actions.js'
import { getCategories } from '../categories/actions.js'

class AddPost extends Component {

  componentWillMount(){
    this.props.getCategories()
  }

  render() {
    var  history, sendNewPost, categories ;
    ({ history, sendNewPost, categories } = this.props)
    console.log(this.props)
    return (
      <div>
        <form onSubmit={(event) => sendNewPost(this, event, history)}>

          <p>Author</p>
          <input name='author' ref={(inp) => this.author=inp}></input>
          <p>Title</p>
          <textarea name='title'ref={(inp) => this.title=inp}></textarea>
          <p>Body</p>
          <textarea name='body' ref={(inp) => this.body=inp}></textarea>
          <p>Category</p>
          <select name='category' ref={(inp) => this.category=inp}>
            {categories.map((cat) => (
              <option value={cat.name} key={cat.path}>{cat.name}</option>
            ))}
          </select>
          <br/>
          <br/>
          <input type="submit" value="Add" />
        </form>
      </div>
    )
  }
}

function generateGuid() {
  var result, i, j;
  result = '';
  for(j=0; j<32; j++) {
    if( j == 8 || j == 12|| j == 16|| j == 20)
      result = result + '-';
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
}

// can have complex state transformations here
const mapStateToProps = ({ categories }) => ({
  categories,
})

// can have more complex functions here
const mapDispatchToProps = dispatch => ({
  sendNewPost: (form, event, history, postId) => {
      event.preventDefault()
      const newPost = {
        id: generateGuid(),
        author: form.author.value,
        title: form.title.value,
        body: form.body.value,
        category: form.category.value,
        timestamp: Date.now()
      }
      dispatch(addPost(newPost))
      history.push('/')
  },
  getCategories: () => dispatch(getCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
