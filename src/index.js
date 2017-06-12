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
      allowNewCmd: false,
      errors: []
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
    let errors = [];
    let commandExists = false;
    commands.map(cmd => {
      if (cmd.name === currentCmd) {
        commandExists = true;
      }
    })

    if (!commandExists && currentCmd.length >= 3 && currentReply.length >= 4) {
      let newCommand =     {
        name: currentCmd,
        value: currentReply
      }
      this.setState({
        commands: [
          ...commands,
          newCommand
        ],
        errors: [],
        currentCmd: '',
        currentReply: ''
      }, () => {
        axios.post('/api/saveCmd', newCommand)
        .then(res => {
          console.log(res)
          this.setState({
            errors: [],
            newCommand: {}
          })
        })
        .catch(err => {
          console.warn(err);
        })
      })
    } else {
      if (commandExists) {
        errors.push('Command exists');
      }

      if (currentCmd.length < 3) {
        errors.push('Command 3 or more symbols')
      }

      if (currentReply.length < 4) {
        errors.push('Reply 4 or more symbols')
      }

      this.setState({
        errors
      })
    }
  }


  render() {
    let {currentCmd, commands, allowNewCmd, currentReply, errors} = this.state;

    return (
      <App
        currentReply={currentReply}
        currentCmd={currentCmd}
        commands={commands}
        errors={errors}
        allowNewCmd={allowNewCmd}
        submit={() => this.submit()}
        onChange={(input, cmd) => this.onChange(input, cmd)}
        />
    )
  }
}

ReactDOM.render(<MainContainer />, document.getElementById('root'));
