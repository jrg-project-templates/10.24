import React, { Component } from 'react'
class WinTips extends Component {
  render() {
    if (this.props.disableWinTips) return null;
    if (!this.props.reachedGoal) return null;
    return (
      <div className="win-tips-wrapper">
        <span className="text-stroke">Happy</span>
        <span className="text-stroke">Programmer's Day!</span>
        <div className="actions">
          <span className="clickable" onClick={this.props.onContinueClick}>
            Continue to get to the 2048
          </span>
        </div>
      </div>
    );
  }
}

export default WinTips;