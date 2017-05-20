import React from 'react';
import "./styles/CmdList.css";

const CmdList = ({commands}) => {
  const List = commands.map((cmd, i) => {
    return (
      <div key={`list_${i}`} className="cmdListItem">
        <span className="cmdName">
          Command: <span style={{color: '#777'}}>{cmd.name}</span>
        </span>
        <span className="cmdValue">
          <span style={{color: '#ccc'}}>Reply: </span>{cmd.value}
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