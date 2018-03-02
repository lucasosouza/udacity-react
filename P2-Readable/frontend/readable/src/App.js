import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { addPost } from './actions.js'

class App extends Component {

  state = {
    posts: [],
    newPost: ''
  }

  componentDidMount(){
    const {store} = this.props
    store.subscribe(() => {
      this.setState({
        posts: store.getState().posts
      })
    })
  }

  addNewPost = () => {
    const {store} = this.props
    store.dispatch(addPost(this.state.newPost))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input value={this.state.newPost} onChange={(event) => this.setState({newPost: event.target.value})}/>
        <button onClick={() => this.addNewPost()}>Aperte aqui, com carinho</button>
      </div>
    );
  }
}

export default App;
