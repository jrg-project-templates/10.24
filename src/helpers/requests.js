import axios from 'axios'
import { apiHost } from './env'
const getMe = async () => {
  try {
    return (await axios.get(`${apiHost}/api/v1/me`)).data.resource
  } catch (e) {
    return null
  }
}

const getHeros = () => axios.get(`${apiHost}/api/v1/activities/heroes`)

const submitScore = (body) => axios.post(`${apiHost}/api/v1/activities/submit_1024_score`, body)

export { getMe, getHeros, submitScore }
