import React from 'react'
const WinTips = (props) => {
  if (props.disableWinTips) return null;
  if (!props.reachedGoal) return null;
  return (
    <div className="win-tips-wrapper">
      <span className="text-stroke">Happy</span>
      <span className="text-stroke">Programmer's Day!</span>
      <div className="actions">
        <span className="clickable" onClick={props.onContinueClick}>
          &emsp;继续游戏&emsp;
        </span>
      </div>
    </div>
  );
}

export default WinTips;
