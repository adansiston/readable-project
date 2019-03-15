import React, { Component } from 'react'
import { connect } from 'react-redux'

import { handleSetAuthedUser } from '../actions/shared'


class TopBar extends Component {

  componentDidMount(){
    
    if(!this.props.authedUser){
      this.props.dispatch(handleSetAuthedUser('thingone'))
      this.setState(() => ({
        authedUser: 'thingone'
      }))
    } else {
      this.setState(() => ({
        authedUser: this.props.authedUser
      }))
    }
  }

  state = {
    authedUser: '',
  }


  change = (event) => {
    let authedUser = event.target.value;
    this.props.dispatch(handleSetAuthedUser(authedUser))
    this.setState(() => ({
      authedUser
    }))
    
  }
  
    
    
  

  render() {
    return (
      <div className="header clear">
        <header className="header clear">
        <font color="white">
          <h1>Post Project</h1>
          <div className="header clear">
          <br></br>
            <label htmlFor="user">Change logged user&nbsp;&nbsp;</label>
            <select name="user" onChange={this.change} defaultValue='none' className="selectBox selectBox">
              <option value="none" disabled>Select logged user...</option>
              <option value="thingone" >ThingOne</option>
              <option value="thingtwo">ThingTwo</option>
              <option value="tyler">Tyler</option>
              <option value="adan">Adan</option>
            </select>
            <br/>
            <span>Logged user: {
              this.state.authedUser === 'thingone' 
              ? 'Thing One'
              : this.state.authedUser === 'thingtwo' 
              ? 'Thing Two'
              : this.state.authedUser === 'tyler' 
              ? 'Tyler'
              : 'Adan'
            }</span>
          </div>
          </font>
          

        </header>
      </div>
    )
  }
}

function mapStateToProps(authedUser) {
  return (authedUser)
}

export default connect(mapStateToProps)(TopBar)