import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialCategories, handleInitialPosts } from './actions/shared'
import './App.css';
import Posts from './components/Posts'


class App extends Component {
  
  
  componentDidMount() {
      this.props.dispatch(handleInitialCategories());
      this.props.dispatch(handleInitialPosts());
  }
  componentWillMount() {
  }

  render() {
    return (
      <div className="App">
        <Posts/>
      </div>
    );
  }
}

function mapStateToProps(posts) {
  return (posts)
}
export default connect(mapStateToProps)(App)