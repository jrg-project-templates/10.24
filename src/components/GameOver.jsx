import React from 'react'
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

const GameOver = (props) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [input, setInput] = React.useState('')
  const [me, setMe] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const isError = !input.trim()

  const initialRef = React.useRef()

  const onSubmitScore = async () => {
    onOpen()
    const me = await getMe();
    setMe(me)
    if (me && me.nickname) {
      setInput(me.nickname)
    }
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
        <div className="submit-score" onClick={onSubmitScore}>
          提交成绩
        </div>
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
                  得分最高的朋友将获得半年VIP哦~
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
    </>)
}

export default GameOver
