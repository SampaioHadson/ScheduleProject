import React from 'react'
//import {Router, Route, Redirect} from 'react-router'
import App from '../AppIndex'
import {
    HashRouter,
    Route,
  } from 'react-router-dom';
  

export default props => (
  <HashRouter>

    <div>
      <Route exact path="/" component={App}/>
      <Route path="/Contatos" exact  component={App} />

    </div>
    
 </HashRouter >

)