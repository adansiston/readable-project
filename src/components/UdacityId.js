import React, { Component } from 'react'
import { connect } from 'react-redux';
import PostView from './PostView';
import * as CommentsAPI from '../utils/CommentsAPI';
import { Link } from 'react-router-dom'



class UdacityCategoryId extends Component {

  state = {
    temErro: true,
    canRender: false,
    post: {},
  }

  componentWillMount() {
    let {id} = this.props.match.params;
    CommentsAPI.getPost(id)
    .then(post => {
      (post.hasOwnProperty('error') || !post.hasOwnProperty('id'))
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

    return (
      <div>

          {this.state.canRender && this.state.temErro
          ? 
          <div>
            <h1>Post not found.</h1>
            <br></br><br></br>
            <Link to='/' >
              Home
            </Link>
          </div>
          : this.state.canRender && !this.state.temErro
          && <PostView id={this.state.post.id} />
          }

      </div>
    )
  }
}

function mapStateToProps(posts) {
  return (posts)
}
export default connect(mapStateToProps)(UdacityCategoryId)