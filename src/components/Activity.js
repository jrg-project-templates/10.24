import React, { Component } from 'react'
import CursorSVG from '../assets/cursor.svg'
import giftImage from '../assets/gift.jpg'
import qrcodeImage from '../assets/qrcode.jpg'
class Activity extends Component {
  render() {
    if (!this.props.visible) return null;
    return (
      <div className="activity-wrapper">
        <h3 className="text-stroke header">
          <img src={CursorSVG} alt="手" className="cursor-left" />
          扫描二维码加入群聊<br />有机会获得奖品
          <img src={CursorSVG} alt="手" className="cursor-right" />
        </h3>
        <img src={qrcodeImage} alt="二维码" className="qrcode" />
        <p className="text-stroke mini content">- 将通关截图发到饥人谷群内参赛可以兑换奖品！</p>
        <p className="text-stroke mini content">- 截图参赛超100人，直播间免费教你开发同款1024小游戏！</p>
        <p className="text-stroke mini content">- 得到数字1024时得分最高者将获得“菜狗玩偶”一份；</p>
        <img src={giftImage} alt="二维码" className="gift" />
        <div className="divider"></div>
        <h3 className="text-stroke header">
          游戏规则
        </h3>
        <p className="text-stroke mini content">用手指滑动数字，直线上相同数字可相加合并。相加得到数字 "1024" 会激发彩蛋！</p>
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