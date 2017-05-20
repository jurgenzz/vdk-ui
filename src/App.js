import React from 'react';
import Inputs from './Inputs';
import './styles/App.css';
import CmdList from './CmdList';

const App = (props) => {
  return (
    <div id='app'>
      <h1>
        Command manager
      </h1>
      <Inputs {...props} />
      <CmdList commands={props.commands} />
    </div>
  )
}

export default App;