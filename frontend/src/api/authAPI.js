import axios from 'axios'

const authAPI = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/auth`,
  withCredentials: true,
})

const loginUser = async (data) =>
  authAPI
    .post('/login', JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.data)

const getSession = async () =>
  authAPI.get('/session').then((response) => response.data)

const refreshToken = async () =>
  authAPI.put('/refresh').then((response) => response.data)

const logoutUser = async () =>
  authAPI.delete('/logout').then((response) => response.data)

export { loginUser, logoutUser, refreshToken, getSession }
