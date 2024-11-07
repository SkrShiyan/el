import React from 'react';
import Header from './Header';
import Content1 from './Content1';
import Content2 from './Content2';
import './App.css';

const App = () => {
  return (
    <div className="Main-container">
      <Header />
      <Content1 />
      <Content2 />
    </div>
  );
}

export default App;
