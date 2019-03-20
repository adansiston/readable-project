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
import AllCategories from './components/AllCategories';
import ReactCategory from './components/React';
import ReduxCategory from './components/Redux';
import UdacityCategory from './components/Udacity';
import ReactCategoryId from './components/ReactId';
import ReduxCategoryId from './components/ReduxId';
import UdacityCategoryId from './components/UdacityId';

const store = createStore(reducer, middleware)

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={App} />
          <Route path="/newpost/:category" component={NewPost} />
          <Route path="/postview/:id" component={PostView} />
          <Route path="/allcategories" component={AllCategories} />          
          
          <Route path="/react/:id" component={ReactCategoryId} />
          <Route path="/react" component={ReactCategory} />
          
          <Route path="/redux/:id" component={ReduxCategoryId} />
          <Route path="/redux" component={ReduxCategory} />
          
          <Route path="/udacity/:id" component={UdacityCategoryId} />
          <Route path="/udacity" component={UdacityCategory} />
                    
          <Route path='*' component={App} />
        </Switch>
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
  )