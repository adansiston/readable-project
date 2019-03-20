import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Posts from './Posts';
import { handleInitialCategories, handleInitialPosts } from '../actions/shared';
import PostView from './PostView';
import * as CommentsAPI from '../utils/CommentsAPI';


class ReactCategoryId extends Component {

  state = {
    temErro: true,
    canRender: false,
    post: {},
  }

  componentWillMount() {
    let {id} = this.props.match.params;
    CommentsAPI.getPost(id)
    .then(post => {
      console.log('tem erro???', post.hasOwnProperty('error'))
      post.hasOwnProperty('error')
      ? this.setState(() => ({
          temErro: true
        }))
      : this.setState(() => ({
          post: post,
          temErro: false,
        }))
      
        this.setState(() => ({
          canRender: true
        }))
      
     })
  }

  componentDidMount() {
  }
  



  render() {
    

    console.log('canRender no render', this.state.canRender)
     
  

    return (
      <div>

          {console.log('this.state.canRender no render', this.state.canRender)}
          {console.log('this.state.temErro no render', this.state.temErro)}
          {this.state.canRender && this.state.temErro
          ? <span>com erro</span>
          : this.state.canRender && !this.state.temErro
          && <span>sem erro</span>
          }

          {/*<PostView id={this.state.post.id} />*/}

      </div>
    )
  }
}

function mapStateToProps(posts) {
  return (posts)
}
export default connect(mapStateToProps)(ReactCategoryId)