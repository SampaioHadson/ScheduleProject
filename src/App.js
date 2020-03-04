import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './Routes/Menu'
import Routes from './Routes/Routes'

function App() {
  return (
    <div className='container-fluid'>
     <Menu></Menu>
     <Routes></Routes>
    </div>
  );
}

export default App;
