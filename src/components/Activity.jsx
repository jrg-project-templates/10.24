import React, { useEffect, useState } from 'react'
import CursorSVG from '../assets/cursor.svg'
import qrcodeImage from '../assets/qrcode.jpg'
import { getHeros } from '../helpers/requests'

const Activity = (props) => {
  const [heroes, setHeros] = useState([])
  useEffect(() => {
    fetchHeroes()
    document.addEventListener('submit-new-score', (e) => {
      setHeros(e.detail)
    })
  }, [])
  const fetchHeroes = async () => {
    try {
      await getHeros().then(r => setHeros(r.data.heroes))
    } catch (e) { }
  }
  if (!props.visible) return null;
  return (
    <div className="activity-wrapper">
      <h3 className="text-stroke header">
        <img src={CursorSVG} alt="手" className="cursor-left" />
        扫描二维码加入群聊<br />有机会获得奖品
        <img src={CursorSVG} alt="手" className="cursor-right" />
      </h3>
      <img src={qrcodeImage} alt="二维码" className="qrcode" />
      <p className="text-stroke mini content">- 将通关截图发到饥人谷群内参赛可以兑换奖品~</p>
      <p className="text-stroke mini content">- 参与游戏即可获得<strong>20元平台优惠券~</strong></p>
      <p className="text-stroke mini content">- 活动结束时得分前三位将获得获得<strong>半年VIP会员!</strong></p>
      <div className="divider"></div>
      <h3 className="text-stroke header">
        游戏规则
      </h3>
      <p className="text-stroke mini content">用手指滑动数字，直线上相同数字可相加合并。相加得到数字 "1024" 会激发彩蛋！</p>
      <div className='divider'></div>
      <h3 className="text-stroke header">
        英雄榜
      </h3>
      <ol className='heroes'>
        {heroes.map((hero, index) => {
          return <li className='text-stroke mini' key={index}>
            <div className='name'>{index + 1}. {hero.user_name}</div>
            <div className='score'><strong>{hero.score}</strong></div>
          </li>
        })}
      </ol>

      <div className="actions">
        <span className="clickable" onClick={props.onCloseActivity}>
          返回游戏
        </span>
      </div>
    </div>
  );
}

export default Activity;
