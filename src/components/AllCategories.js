import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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