import React, { Component } from 'react'
import CursorSVG from '../assets/cursor.svg'
import giftImage from '../assets/gift.jpg'
import qrcodeImage from '../assets/qrcode.jpg'
class Activity extends Component {
  render() {
    if (!this.props.visible) return null;
    return (
      <div className="activity-wrapper">
        <div className="text-stroke first-line">
          <img src={CursorSVG} alt="手" className="cursor-left" />
          扫描二维码加入群聊<br />有机会获得奖品
          <img src={CursorSVG} alt="手" className="cursor-right" />
        </div>
        <img src={qrcodeImage} alt="二维码" className="qrcode" />
        <span className="text-stroke mini content">将通关截图发到饥人谷群内参赛可以兑换奖品！<br />
          得到数字1024时得分最高者将获得“菜狗玩偶”一份；</span>
        <img src={giftImage} alt="二维码" className="gift" />

        <span className="text-stroke mini content">另外截图参赛超100人，<br />
          直播间免费教你开发同款1024小游戏！</span>
        <div className="actions">
          <span className="clickable" onClick={this.props.onCloseActivity}>
            继续游戏
          </span>
        </div>
      </div>
    );
  }
}

export default Activity;