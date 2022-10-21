import React, { useEffect, useState } from 'react'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const advertisementList = [
  { name: '【程序员英语第2期】远程外企求职面试，助你一臂之力！', link: 'https://mp.weixin.qq.com/s/DdAJPDKxoqVzjTZAFCGchA' },
  { name: '【算法班第二期】 大厂老师保姆式带你刷算法，第一期好评超多！', link: 'https://mp.weixin.qq.com/s/yKeJdA1YmtJastqBblKoCg' },
  { name: '新Java体系班｜大厂架构师带你从零到就业', link: 'https://mp.weixin.qq.com/s/5BVvaDZBhzXSv2oCmUSkww' },
  { name: '【2023版前端系统班全面升级】小班直播模式、四十一个大模块', link: 'https://mp.weixin.qq.com/s/7CYcnzkN04lbBDU2fXYSUg' }
]

const getIndex = (currentIndex) => {
  const length = advertisementList.length;
  const newIndex = Math.floor(Math.random() * length)
  if (newIndex !== currentIndex) return newIndex
  else return getIndex(currentIndex)
};

const TinyAdvertisement = () => {
  const [index, setIndex] = useState(getIndex())

  useEffect(() => {
    setInterval(() => {
      setIndex(prev => getIndex(prev))
    }, 8000)
  }, [])

  const advertisement = advertisementList[index] || advertisementList[0]
  return <div className='tiny-advertisement'>
    <Link href={advertisement.link} isExternal color="#999">
      {advertisement.name} <ExternalLinkIcon mx='2px' />
    </Link>
  </div>
}

export default React.memo(TinyAdvertisement, () => true)
