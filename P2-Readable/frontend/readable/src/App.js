import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { addPost, getPosts, receivePosts} from './actions.js';
import { connect } from 'react-redux';
import Post from './Post.js'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import * as dataAPI from './dataAPI.js'


class App extends Component {

  state = {
    newPost: '',
    pts: []
  }

  // componentDidMount(){
  //   const {store} = this.props
  //   store.subscribe(() => {
  //     this.setState({
  //       posts: store.getState().posts
  //     })
  //   })
  // }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact
            path="/"
            render={({history}) => (
                <div>
                  <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                  </header>

                  <button onClick={() => this.props.getPosts()}>Recupera posts</button>
                  <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                  </p>
                  <input value={this.state.newPost} onChange={(event) => this.setState({newPost: event.target.value})}/>
                  <button onClick={() => this.props.addPost(this.state.newPost)}>Aperte aqui, com carinho</button>
                  <br/>
                  <p> {`/post/${this.state.newPost}`}</p>
                  <Link to={`/post/${this.state.newPost}`}>Show Post</Link>
                </div>
            )}
          />
          <Route
            path="post/:id"
            render={({match}) => (
              <div>
                <Post/>
                <p>{match.params.id}</p>
              </div>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

// can have complex state transformations here
const mapStateToProps = ({posts, users}) => ({
  posts,
  users
})

// can have more complex functions here
const mapDispatchToProps = dispatch => ({
  addPost: data => dispatch(addPost(data)),
  getPosts: data => (
      dataAPI
        .getPosts()
        .then(posts => dispatch(receivePosts(posts)))
      )
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
