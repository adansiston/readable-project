import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { handleCommentScore } from '../actions/shared';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

class Comment extends Component {

  state = {
    text: '',
    title: '',
    edit: false,
  }

  initialText = '';

  classNameTextInput = 'inputText';
  showButton = '';


  componentDidMount() {
    this.initialText = this.props.comment.body;
    this.setState(() => ({
      text: this.props.comment.body,
    }))
    this.showButton = 'edit';
  }

  handleEditComment = () => {
    this.showButton = 'save';
    this.setState(() => ({
      edit: true,
    }))
    this.classNameTextInput = 'inputTextEdit';

  }

  handleSaveComment = () => {
    this.props.comment.body = this.state.text;
    this.props.comment.timestamp = Date.now();
    this.props.onEditComment(this.props.comment)
    this.setState(() => ({
      edit: false,
    }))
    this.initialText = this.state.text;
    this.classNameTextInput = 'inputText';
    this.showButton = 'edit';

  }

  handleTextChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({
      text
    }))
  }


  cancelEdit = () => {
    this.setState(() => ({
      edit: false,
      text: this.initialText,
    }))
    //this.initialText = this.state.text;
    this.classNameTextInput = 'inputText';
    this.showButton = 'edit';

  }


  addScore = () => {
    this.changeScore('upVote');
  }

  changeScore(operation) {
    this.props.dispatch(handleCommentScore(operation, this.props.comment.id))
      .then(
        this.props.onChangeCommentScore(operation)
      )
  }

  subtractScore = () => {
    this.changeScore('downVote');
  }



  render() {

    var date = new Date(this.props.comment.timestamp);
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
      <div>
        <br /><br />

        <div className='borderpostComment'>


          <div>

            <br />
            <span>Author: {this.props.comment.author}</span>
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
              Vote score: {this.props.comment.voteScore} &nbsp;&nbsp;
              <Icon name='thumbs up outline' size='large' onClick={this.addScore} /> &nbsp;&nbsp;
              <Icon name='thumbs down outline' size='large' onClick={this.subtractScore} /> &nbsp;&nbsp;
            </span>


          </div>
          {this.showButton === 'edit' &&
            <div>
              <button className='btnEdit' disabled={(this.props.userLogger !== this.props.comment.author) || (this.state.edit)} onClick={this.props.onDeleteComment}>
                Remove
          </button>

              <button className='btnEdit' disabled={this.props.userLogger !== this.props.comment.author} onClick={this.handleEditComment}>
                Edit
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
              <button className='btnEdit' onClick={this.handleSaveComment} disabled={this.state.text === ''}>
                Save
             </button>
            </span>
          }
        </div>




      </div>
    )
  }
}



export default withRouter(connect()(Comment))