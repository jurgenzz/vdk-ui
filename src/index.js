import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';


class MainContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      commands: [
        
      ],
      currentCmd: '!',
      currentReply: '',
      allowNewCmd: false
    }
  }
  
  componentDidMount() {
    axios.get('/api/commands')
    .then(res => {
      let commands = JSON.parse(res.data);
      let formattedCmds = Object.keys(commands).map(cmd => {
        
        return {
          name: cmd,
          value: commands[cmd]
        }
      })
      this.setState({
        commands: formattedCmds
      })
    })
    .catch(err => {
      console.warn(err)
    })
  }
  
  onChange(input, cmd) {
    
    let newCmd = cmd;
    if (input === 'currentCmd') {
      newCmd = '!' + newCmd.replace(/\W/g, '');
    }
    
    this.setState({
      [input]: newCmd
    })
  }
  
  submit() {
    const {commands, currentCmd, currentReply} = this.state;
    let commandExists = false;
    commands.map(cmd => {
      if (cmd.name === currentCmd) {
        commandExists = true;
      }
    })
    
    if (!commandExists && currentCmd.length >= 4 && currentReply.length >= 4) {
      let newCommand =     {
        name: currentCmd,
        value: currentReply
      }
      this.setState({
        commands: [
          ...commands,
          newCommand
        ]
      }, () => {
        axios.post('/api/saveCmd', newCommand)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.warn(err);
        })
      })
    }
    }
    
  
  render() {
    let {currentCmd, commands, allowNewCmd, currentReply} = this.state;
    
    return (
      <App 
        currentReply={currentReply}
        currentCmd={currentCmd}
        commands={commands}
        allowNewCmd={allowNewCmd}
        submit={() => this.submit()}
        onChange={(input, cmd) => this.onChange(input, cmd)}
        />  
      )
    }
  }
  
  ReactDOM.render(<MainContainer />, document.getElementById('root'));