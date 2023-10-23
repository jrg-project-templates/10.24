import React, { useEffect, useState } from 'react'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const advertisementList = [
  { name: '【程序员英语第4期】远程外企求职面试，助你一臂之力！', link: '/courses/2baf5ecb-37b1-4a0f-a175-469cf8737881' },
  { name: '【算法班第3期】 大厂老师保姆式带你刷算法，好评超多！', link: '/courses/0b434131-216f-4790-ab3f-c34bf88d7236' },
  { name: '【Java 系统班（第11期）】大厂架构师带你从零到就业', link: '/courses/9f38be38-8c9b-4041-a2c0-41eab565fd45' },
  { name: '【2023版前端系统班全面升级】小班直播模式、四十一个大模块', link: '/courses/71c0cb93-74c4-4815-a28b-03c6a918730f' },
  { name: '【Golang系统班】从基础到微服务', link: '/courses/adb8eac1-9802-4aee-8ca2-50f905272bef'},
  { name: '【C++系统班第3期】P7行业大佬亲自带班', link: '/courses/468e7881-e7e3-4ad4-8e7e-3836be848019'}
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
