import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Posts from './Posts';
import { handleInitialCategories, handleInitialPosts } from '../actions/shared';
import PostView from './PostView';

class ReduxCategoryId extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialCategories());
    this.props.dispatch(handleInitialPosts());
  }

  render() {

    let {id} = this.props.match.params;
 
    return (
      <div>

        <PostView id={id} />

      </div>
    )
  }
}

export default withRouter(connect()(ReduxCategoryId))