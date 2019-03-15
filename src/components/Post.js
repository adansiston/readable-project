import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { handleEditPost, handleRemovePost, handlePostScore } from '../actions/shared';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'


class Post extends Component {

  state = {
    text: '',
    title: '',
    edit: false,
    category: 'none',
  }

  showButton = '';


  savePost = () => {
    let post = {};
    post.id = this.props.post.id;
    post.title = this.state.title;
    post.body = this.state.text;
    this.props.dispatch(handleEditPost(post));
    this.setState(() => ({
      edit: false,
    }))
    this.classNameTitleInput = 'inputTitle'
    this.showButton = 'edit';
  }

  componentDidMount() {
    this.showButton = 'edit';
    this.setState(() => ({
      title: this.props.post.title,
      text: this.props.post.body,
      category: this.props.post.category,
    }))
  }

  classNameTitleInput = 'inputTitle';
  classNameTextInput = 'inputText';


  cancelEdit = () => {
    this.showButton = 'edit';
    this.setState(() => ({
      title: this.props.post.title,
      text: this.props.post.body,
      category: this.props.post.category,
      edit: false,
    }))
    this.classNameTitleInput = 'inputTitle';
    this.classNameTextInput = 'inputText';
  }

  editPost = () => {
    this.showButton = 'save';
    this.classNameTitleInput = 'inputTitleEdit';
    this.classNameTextInput = 'inputTextEdit';
    this.setState(() => ({
      edit: true
    }))
  }

  removePost = (e) => {
    this.props.dispatch(handleRemovePost(this.props.post));
    this.props.history.goBack();
  }



  goToPostView = () => {
    this.props.history.push('/postview/' + this.props.post.id);
  }

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({
      title
    }))
  }

  handleTextChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({
      text
    }))
  }

  addScore = () => {
    this.changeScore('upVote');
  }

  changeScore(operation) {
    this.props.dispatch(handlePostScore(operation, this.props.post.id));
  }

  subtractScore = () => {
    this.changeScore('downVote');
  }

  render() {

    var date = new Date(this.props.post.timestamp);
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);
    if (gg < 10)
        gg = "0" + gg;
    if (mm < 10)
        mm = "0" + mm;
    var cur_day = aaaa + "-" + mm + "-" + gg;
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds();
    if (hours < 10)
        hours = "0" + hours;
    if (minutes < 10)
        minutes = "0" + minutes;
    if (seconds < 10)
        seconds = "0" + seconds;

    let formatDate = (cur_day + " " + hours + ":" + minutes + ":" + seconds);
             

    return (
      <div >
        <br /><br />

        <div className='borderpost'>


          <div>

            {!this.props.hideLink &&
              <Link to={`/postview/${this.props.post.id}`} >
                  View more
              </Link>
            }

            <input
              disabled={!this.state.edit}
              className={this.classNameTitleInput}
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
            <br />
            <span>Category: {this.props.post.category}</span>
            <br />
            <span>Author: {this.props.post.author}</span>
            <div>Date: {formatDate}</div>


            <p>
              <input
                disabled={!this.state.edit}
                className={this.classNameTextInput}
                value={this.state.text}
                onChange={this.handleTextChange}
              />
            </p>
          </div>

          <div >


            <span>
              Vote score: {this.props.post.voteScore} &nbsp;&nbsp;
              <Icon name='thumbs up outline' size='large' onClick={this.addScore} /> &nbsp;&nbsp;
              <Icon name='thumbs down outline'  size='large' onClick={this.subtractScore}/> &nbsp;&nbsp;
              
            </span>
            <br></br><br></br>
            <span>
              <Icon name='comment outline' size='large' /> &nbsp;&nbsp; {this.props.post.commentCount}
            </span>

            

          </div>
          <br/><br/>
          
          {this.props.edit === 'true' &&
           this.showButton === 'edit'
            &&
            <div>
              <button className='btnEdit' disabled={(this.props.edit === 'true' && this.props.authedUser === this.props.post.author) ? false : true} onClick={this.editPost}>
                Edit
            </button>
              <button className='btnEdit' disabled={(this.props.edit === 'true' && this.props.authedUser === this.props.post.author) ? false : true} onClick={this.removePost}>
                Remove
          </button>
            </div>
          }
          {this.state.edit &&
           this.showButton === 'save'
            &&
            <span>
              <button className='btnEdit' onClick={this.cancelEdit}>
                Cancel
             </button>
              <button className='btnEdit' onClick={this.savePost} disabled={this.state.text === '' || this.state.title === '' || this.state.category === 'none'}>
                Save
             </button>
            </span>
          }




        </div>



      </div>
    )
  }
}


function mapStateToProps(posts) {
  return (posts)
}
export default withRouter(connect(mapStateToProps)(Post))