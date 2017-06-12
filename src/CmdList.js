import React from 'react';
import "./styles/CmdList.css";

const CmdList = ({commands}) => {
  const blueSpan = param => <span className="blueSpan">{'{'}{param}{'}'}</span>
  const makeReply = (cmd) => {
    const paramIndex = cmd.indexOf('{param}')
    const nickIndex = cmd.indexOf('{nick}');
    const cmdToReturn = cmd.split('{param}');
    // console.log(cmd2);
    if (paramIndex === -1) {
      return cmd;
    }
    return (
      <span>
        {cmdToReturn[0]}
        {blueSpan('param')}
        {cmdToReturn[1]}
      </span>
    )

  }
  const List = commands.map((cmd, i) => {
    return (
      <div key={`list_${i}`} className="cmdListItem">
        <span className="cmdName">
          Command: <span style={{color: '#777'}}>{cmd.name}</span>
        </span>
        <span className="cmdValue">
          <span style={{fontWeight: 500, marginBottom: 'px'}}>Reply: </span>
          <span>{makeReply(cmd.value)}</span>
        </span>
      </div>

    )
  })
  return (
    <div id="CmdList">
      {List}
    </div>
  )
}

export default CmdList;
