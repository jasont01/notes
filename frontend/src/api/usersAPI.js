import axios from 'axios'

const usersAPI = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/users`,
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

//TODO: Implement
const updateUser = async (accessToken) => {
  if (!accessToken) return
  const response = await usersAPI.patch('/update', {
    headers: { authorization: 'Bearer ' + accessToken },
  })
  return response.data
}

//TODO: Implement
const deleteUser = async (accessToken) => {
  if (!accessToken) return
  const response = await usersAPI.delete('/delete', {
    headers: { authorization: 'Bearer ' + accessToken },
  })
  return response.data
}

export { registerUser, getUser, updateUser, deleteUser }
