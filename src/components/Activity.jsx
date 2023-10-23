import React, { useEffect, useState } from 'react'
import CursorSVG from '../assets/cursor.svg'
import { getHeros } from '../helpers/requests'
const qrcodeImage = "https://static.xiedaimala.com/xdml/image/5939aa7c-d446-47c4-a9c1-ea1e52b10249/MjAyMi02LTE2LTEyLTMwLTctNTk5.jpeg"

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
        扫描二维码<br />有机会获得奖品
        <img src={CursorSVG} alt="手" className="cursor-right" />
      </h3>
      <img src={qrcodeImage} alt="二维码" className="qrcode" />
      <div className='lg-center'>
        <p className="text-stroke mini content">- 将通关截图发给班主任参赛可以兑换奖品~</p>
        <p className="text-stroke mini content">- 参与游戏即可获得<strong>20元平台优惠券~</strong></p>
        <p className="text-stroke mini content">- 得分前三位将<strong>免费送10.24专区课程1门</strong>（得分截止24号晚上24点前，记得截图发给班主任哦）</p>
      </div>
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
