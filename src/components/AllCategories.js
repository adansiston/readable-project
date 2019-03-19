import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { handleCommentScore } from '../actions/shared';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import Posts from './Posts';

class AllCategories extends Component {





  render() {
    return (
      <div>
        <Posts category={'all'}/>
      </div>
    )
  }
}



export default withRouter(connect()(AllCategories))