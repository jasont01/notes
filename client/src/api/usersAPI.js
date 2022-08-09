import axios from 'axios'

const usersAPI = axios.create({
  baseURL: '/api/users',
})

const registerUser = async (data) => {
  const response = await usersAPI.post('/register', JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
  return response.data
}

const getUser = async (accessToken) => {
  if (!accessToken) return
  const response = await usersAPI.get('/', {
    headers: { authorization: 'Bearer ' + accessToken },
  })
  return response.data
}

const updateUsername = async (accessToken, username) => {
  if (!accessToken) return
  const response = await usersAPI.patch(
    '/username',
    { username },
    {
      headers: { authorization: 'Bearer ' + accessToken },
    }
  )
  return response.data
}

const updateEmail = async (accessToken, email) => {
  if (!accessToken) return
  const response = await usersAPI.patch(
    '/email',
    { email },
    {
      headers: { authorization: 'Bearer ' + accessToken },
    }
  )
  return response.data
}

const updatePassword = async (accessToken, password) => {
  if (!accessToken) return
  const response = await usersAPI.patch(
    '/password',
    { password },
    {
      headers: { authorization: 'Bearer ' + accessToken },
    }
  )
  return response.data
}

const deleteUser = async (accessToken) => {
  if (!accessToken) return
  const response = await usersAPI.delete('/delete', {
    headers: { authorization: 'Bearer ' + accessToken },
  })
  return response.data
}

export {
  registerUser,
  getUser,
  updateUsername,
  updateEmail,
  updatePassword,
  deleteUser,
}
