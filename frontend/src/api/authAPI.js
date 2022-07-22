import axios from 'axios'

const authAPI = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
})

const loginUser = async (data) => {
  const response = await authAPI.post('/login', JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
  return response.data
}

const logoutUser = async () => {
  const response = await authAPI.get('/logout')
  return response.data
}

const refreshToken = async () => {
  const response = await authAPI.post('/refresh')
  return response.data
}

const isLoggedIn = async () => {
  const response = await authAPI.get('/loggedIn')
  return response.data
}

export { loginUser, logoutUser, refreshToken, isLoggedIn }
