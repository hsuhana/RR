//import {useEffect, useState} from 'react';

//for JSX syntax transformed into React function calls, React 17+ no need this
import React from 'react';

import NavbarRouter from './components/NavbarRouter';

import Footer from './components/Footer';
import './App.css';


function App() {


  return (
    <div className="App">
      <NavbarRouter />
      <Footer />
    </div>
  );
}

export default App;
