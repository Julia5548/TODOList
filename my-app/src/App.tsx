import React, { useState } from 'react';
import User from './ pages/User'
import './App.css';
import { Route } from 'react-router-dom';
import Router from './Router';

const App: React.FC = () => {

  return (
      <div>
        <User />
      </div>
  );
}

export default App;