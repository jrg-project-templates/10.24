import React, { useState } from 'react'
import { getMe, submitScore } from '../helpers/requests'
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  useToast
} from '@chakra-ui/react'

const maxLeftTime = 10


const advertisementList = [
  { content: `<img class="fullscreen" src="//static.xiedaimala.com/xdml/image/5939aa7c-d446-47c4-a9c1-ea1e52b10249/MjAyMy0xMC0yMy0xMi00Mi0xOC0xNjQ=..png">` },
  { content: `<img class="fullscreen" src="//static.xiedaimala.com/xdml/image/5939aa7c-d446-47c4-a9c1-ea1e52b10249/MjAyMy0xMC0yMy0xMi0zMy01Ni00NzE=.png">` },
  {
    content: `<img class="fullscreen" src="//static.xiedaimala.com/xdml/image/5939aa7c-d446-47c4-a9c1-ea1e52b10249/MjAyMy0xMC0yMy0xMy0yNC05LTk1Mw==..png">`
  },
  {
    content: `<img class="fullscreen" src="//static.xiedaimala.com/xdml/image/5939aa7c-d446-47c4-a9c1-ea1e52b10249/MjAyMy0xMC0yMy0xMy0yNy01Mi01NDI=..png">`
  },
  { content: `<img class="fullscreen" src="//static.xiedaimala.com/xdml/image/5939aa7c-d446-47c4-a9c1-ea1e52b10249/MjAyMy0xMC0yMy0xMy0zMC0xNS0xMTM=..png">` }
]
const getIndex = (currentIndex) => {
  const length = advertisementList.length;
  const newIndex = Math.floor(Math.random() * length)
  if (newIndex !== currentIndex) return newIndex
  else return getIndex(currentIndex)
};
const GameOver = (props) => {
  const { resurrectedLeftTimes } = props
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isReviveOpen, onOpen: onReviveOpen, onClose: onReviveClose } = useDisclosure()
  const [input, setInput] = React.useState('')
  const [me, setMe] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const isError = !input.trim()

  const [leftTimes, setLeftTimes] = useState(maxLeftTime + 1)
  const [index, setIndex] = useState(getIndex())
  const advertisementContent = advertisementList[index].content
  const isCounting = leftTimes <= maxLeftTime && leftTimes > 0

  const initialRef = React.useRef()
  const timerRef = React.useRef()

  const onSubmitScore = async () => {
    onOpen()
    const me = await getMe();
    setMe(me)
    if (me && me.nickname) {
      setInput(me.nickname)
    }
  }

  const resurrectedMe = async () => {
    onReviveOpen()
    setIndex(getIndex())
    startCounting()
  }

  const onRevive = () => {
    const event = new CustomEvent('resurrected-me')
    document.dispatchEvent(event)
    cancelRevive()
    toast({
      position: 'top',
      title: '已消去四个最小的方块',
      description: '',
      status: 'success',
      duration: 3000,
    })
  }

  const cancelRevive = () => {
    onReviveClose()
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setLeftTimes(maxLeftTime + 1)
  }

  const startCounting = () => {
    if (leftTimes <= 0) return;
    setLeftTimes(prev => prev - 1)
    timerRef.current = setTimeout(startCounting, 1000)
  }

  const onSubmit = () => {
    if (isError || isLoading) return;
    setIsLoading(true)
    submitScore({
      user_name: input,
      user_id: me ? me.id : undefined,
      score: props.score
    }).then(r => {
      const event = new CustomEvent('submit-new-score', { detail: r.data.heroes })
      setTimeout(() => {
        document.dispatchEvent(event)
      }, 1500)
      toast({
        position: 'top',
        title: '成绩已提交',
        description: '',
        status: 'success',
        duration: 3000,
      })
      setIsLoading(false)
      onClose()
    }, e => {
      setIsLoading(false)
      toast({
        position: 'top',
        title: '成绩提交失败, 请重试',
        description: '',
        status: 'error',
        duration: 3000,
      })
    })
  }

  if (!props.gameOver) return null;
  return (
    <>
      <div className="game-over">
        <div>Game Over</div>
        <div className="action submit-score" onClick={onSubmitScore}>
          提交成绩
        </div>
        {
          resurrectedLeftTimes <= 0 ? <div className="action resurrection disabled">复活次数已用完</div> : <div className="action resurrection" onClick={resurrectedMe}>
            我要复活
          </div>
        }
      </div>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>提交成绩</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={isError}>
              <FormLabel>填写你的昵称</FormLabel>
              <Input ref={initialRef}
                placeholder="I'm 1024 Hero"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {!isError ? (
                <FormHelperText>
                  得分前三位的朋友将获得半年VIP哦~
                </FormHelperText>
              ) : (
                <FormErrorMessage>昵称不可为空哦~</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>算啦</Button>
            <Button colorScheme='blue' onClick={onSubmit} isLoading={isLoading} disabled={isError}>
              提交
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isReviveOpen}
        onClose={onReviveClose}
        isCentered
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ textAlign: 'center' }}>广告时间</ModalHeader>
          <ModalBody pb={0} pl={4} pr={4}>
            <div className='advertisement-wrapper' dangerouslySetInnerHTML={{ __html: advertisementContent }}></div>
          </ModalBody>

          <ModalFooter isCentered style={{ justifyContent: 'center' }}>
            <Button onClick={cancelRevive} mr={3}>算啦不复活</Button>
            {
              leftTimes <= 0 ? (
                <Button colorScheme='green' onClick={onRevive}>
                  Heroes Never Die
                </Button>
              ) : <Button colorScheme='green' disabled={true}>
                阅读完后即可复活 {isCounting ? `(${leftTimes}s)` : ''}
              </Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>)
}

export default GameOver
