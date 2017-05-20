import React from 'react';

const Inputs = ({currentCmd, onChange, submit, currentReply}) => {
  // console.log(props)
  return (
    <div>
      <div className="input-wrap">
        <label>Command</label>
        <input placeholder="Add new command" value={currentCmd} onChange={(e) => onChange('currentCmd', e.target.value)}/>
      </div>
      <label>Reply</label>
      <input placeholder="Reply" value={currentReply} onChange={(e) => onChange('currentReply', e.target.value)}/>
      <button onClick={() => submit()}>
        Submit
      </button>
    </div>
  )
}

export default Inputs;