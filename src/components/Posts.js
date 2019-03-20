import React, { Component } from 'react'
import { connect } from 'react-redux'
import TopBar from './TopBar'
import Post from './Post'
import { Link } from 'react-router-dom'


class Posts extends Component {


  state = {
    posts: [],
    authedUser: '',
    selectedCategory: '',
  }



  componentDidMount() {
    let cat = '';
    this.props.category === 'all'
      ? cat = ''
      : cat = this.props.category

    this.setState(() => ({
      selectedCategory: cat,
    }))

  }


  chageToAllCategories = () => {
    this.setState(() => ({
      selectedCategory: '',
    }))
  }

  chageToReactCategory = () => {
    this.setState(() => ({
      selectedCategory: 'react',
    }))
  }
  chageToReduxCategory = () => {
    this.setState(() => ({
      selectedCategory: 'redux',
    }))
  }
  chageToUdacityCategory = () => {
    this.setState(() => ({
      selectedCategory: 'udacity',
    }))
  }


  orderBy = 'score';
  postsArray = [];


  disableReact = true;
  disableRedux = true;
  disableUdacity = true;


  change = event => {
    this.orderBy = event.target.value;
    this.postsArray = [];
    this.forceUpdate();
  }


  changeUser = (authedUser) => {
    this.setState({
      authedUser
    })
  }

  render() {




    const { posts } = this.props;
    let pts = posts;
    let indice = [];
    this.postsArray = [];


    Object.getOwnPropertyNames(pts).forEach(function (val, idx, array) {
      indice.push(val);
    });


    indice.map((i) => {
      switch (posts[i].category) {
        case 'react':
          return this.disableReact = false
        case 'redux':
          return this.disableRedux = false;
        case 'udacity':
          return this.disableUdacity = false;
        default:
          return null;
      }
    })

    indice.map((i) => {
      return this.postsArray.push(pts[i]);
    })



    switch (this.orderBy) {
      case 'score':
        this.postsArray.sort(function (a, b) { return b.voteScore - a.voteScore });
        break;
      case 'date':
        this.postsArray.sort(function (a, b) { return b.timestamp - a.timestamp });
        break;
      default:
        break;
    }

    let goTo = '';
    this.state.selectedCategory === ''
    ? goTo = '/newpost/all'
    : goTo = '/newpost/' + this.state.selectedCategory



    return (
      <div>
        <TopBar />
        <div className="back">
          <font color="white">
            <div className="back">
              <br /><br /><br />
              <div className="row">
                <br />
                <h3>Available Categories</h3>

                  <Link to={'/react'}>
                    React
                  </Link>
                  <br/>
                  <Link to={'/redux'}>
                    Redux
                  </Link>
                  <br/>
                  <Link to={'/udacity'}>
                    Udacity
                  </Link>
                  <br/>
                  <Link to={'/'} >
                    All
                  </Link>
              </div>
            </div>
          </font>
        </div>

        {this.state.selectedCategory !== '' && <div><h1>Category: {
          this.state.selectedCategory === 'react'
          ? 'React'
          : this.state.selectedCategory === 'redux'
          ? 'Redux'
          : 'Udacity'
          }</h1>
          <br/>
          
          <button type="button" onClick={this.chageToAllCategories}>
          All Categories
          </button>
          </div>
          }
        

        <br></br><br />
        <div >

          <span className='newpost'>
            <Link to={goTo} >
                New Post
            </Link>
          </span>

          <span>
            <label htmlFor="user">Sort by &nbsp;&nbsp;</label>
            <select name="user" onChange={this.change} defaultValue="vote" className="selectBox selectBox">
              <option value="none" disabled>Select logged user...</option>
              <option value="score" >Vote score</option>
              <option value="date">Date</option>
            </select>
          </span>
        </div>


        <br />



        {this.postsArray.map((i) => {
           if (!i.deleted){
            if (this.state.selectedCategory === ''){
              return <Post key={i.id} post={i} edit={false} loggedUser={this.state.authedUser}/>
            } else {
              let cat = this.state.selectedCategory
              return i.category === cat && <Post key={i.id} post={i} loggedUser={this.state.authedUser}/>
            }  
           } else {
             return null
           }
        })}


        <br></br>
        <br></br>
      </div>

    )
  }
}

function mapStateToProps(posts) {
  return (posts)
}

export default connect(mapStateToProps)(Posts)