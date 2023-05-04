import axios from 'axios'
import env from '../env'

const { API_URL, TOKEN } = env

type Props = {
  path: string,
  method?: string,
  params: object,
}

const API = async (props: Props) => {
  const {
    path, method = 'GET', params = {},
  } = props
  const timeout = 15E3
  const config = {
    timeout,
    baseURL: API_URL,
    url: path,
    method,
    params: {
      language: 'en-US',
      ...params,
    },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  }
  const response = await axios(config)
  return response.data
}

export default API
