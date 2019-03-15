import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import middleware from './middleware'	// parte nova

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NewPost from './components/NewPost'
import PostView from './components/PostView';


const store = createStore(reducer, middleware)

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={App} />
          <Route path="/newpost/:category" component={NewPost} />
          <Route path="/postview/:id" component={PostView} />
          <Route path='*' component={App} />
        </Switch>
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
  )