import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Posts from './Posts';
import { handleInitialCategories, handleInitialPosts } from '../actions/shared';

class ReduxCategory extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialCategories());
    this.props.dispatch(handleInitialPosts());
  }

  render() {

    return (
      <div>
        <Posts category={'redux'}/>
      </div>
    )
  }
}

export default withRouter(connect()(ReduxCategory))