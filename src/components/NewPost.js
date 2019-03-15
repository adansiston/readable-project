import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPost } from '../actions/shared'
import {ToastsContainer, ToastsStore} from 'react-toasts';
import { Link } from 'react-router-dom'


class NewPost extends Component {

    state = {
        text: '',
        title: '',
        category: 'none',
        showAddedMsg: false,
        canChangeCategory: true,
    }

    authedUser = '';

    componentDidMount() {
        const { category } = this.props.match.params
        category !== 'all'
        ? this.setState(() => ({
            category: category,
            canChangeCategory: true
        }))
        : this.setState(() => ({
            canChangeCategory: false
        }))
    }
    


    handleCategoryChange = (e) => {
        const category = e.target.value;
        this.setState(() => ({
            category
        }))
    }

    handleTextChange = (e) => {
        const text = e.target.value;
        this.setState(() => ({
            text
        }))
    }
    handleTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({
            title
        }))
    }

    handleSubmit = (e) => {

        ToastsStore.success("Post Added!")

        let post = {};
        let token = localStorage.token = Math.random().toString(36).substr(-8)
        post.id = token;
        post.timestamp = Date.now();
        post.title = this.state.title;
        post.body = this.state.text;
        post.author = this.props.authedUser;
        post.category = this.state.category;
        post.commentCount = 0;
        post.deleted = false;
        post.voteScore = 0

        const { posts } = this.props;

        let pts = posts;
        let indice = [];
        Object.getOwnPropertyNames(pts).forEach(function (val, idx, array) {
            indice.push(val);
        });
        let newInd = (indice.length + 1);
        this.props.dispatch(handleAddPost(newInd, post));
        post = {};
        this.setState({
            text: '',
            title: '',
            category: 'none',
        })
        e.preventDefault()
        this.props.history.push('/')

    }



    render() {
        const { text, title, category } = this.state;
        let { categories } = this.props;
        let indice = [];


        Object.getOwnPropertyNames(categories).forEach(function (val, idx, array) {
            indice.push(val);
        });

        return (
            <div>
                <div className='borderpost'>
                    <h1 className='center'>New Post</h1>
                    <form className='new-content' onSubmit={this.handleSubmit}>

                        <span>
                            <label htmlFor="user">Category &nbsp;&nbsp;</label>
                            <select name="user" value={this.state.category} onChange={this.handleCategoryChange} disabled={this.state.canChangeCategory} className="selectBox">
                                <option value="none" disabled>Category...</option>
                                {indice.length > 0 && indice.map((i) => {
                                    let cat = categories[i].name
                                    return <option key={i} value={cat} >{cat}</option>
                                })}
                            </select>
                        </span>
                        Title <input placeholder="Type the post title"
                            value={title}
                            onChange={this.handleTitleChange}
                            className="titleinput"
                        /><br></br>

                        <span>Author: {this.props.authedUser}</span>
                        <br />
                        <textarea
                            placeholder="Type the new post"
                            value={text}
                            onChange={this.handleTextChange}
                            className='textarea'
                        />
                        <button className='btn' type='submit' disabled={text === '' || title === '' || category === 'none'}>
                            Submit
                        </button>
                    </form>

                    <Link to='/' >
                      Home
                    </Link>


                </div>
                <ToastsContainer store={ToastsStore}/>
            </div>
        )
    }
}

function mapStateToProps(posts) {
    return (posts)
}
export default connect(mapStateToProps)(NewPost)