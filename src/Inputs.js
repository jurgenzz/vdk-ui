import React from 'react';

const Inputs = ({currentCmd, onChange, submit, currentReply, errors}) => {
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
      {errors.map((err, i) => <span className="err" key={'err'+ i}>{err}</span>)}
    </div>
  )
}

export default Inputs;
